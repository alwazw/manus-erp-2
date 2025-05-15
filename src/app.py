from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import psycopg2
import psycopg2.extras

app = Flask(__name__)
CORS(app)

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ.get('DB_HOST', 'db'),
        database=os.environ.get('POSTGRES_DB', 'erp_db'),
        user=os.environ.get('POSTGRES_USER', 'erp_user'),
        password=os.environ.get('POSTGRES_PASSWORD', 'erp_password'),
        port=os.environ.get('DB_PORT', '5432')
    )
    conn.autocommit = True
    return conn

# API routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "ERP Backend API is running"})

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        
        # Get query parameters for filtering
        category = request.args.get('category', '')
        brand = request.args.get('brand', '')
        
        # Build query with optional filters
        query = """
        SELECT 
            id, category, brand, item_description, sku, 
            screen_size_in, touchscreen, storage_tb, memory_gb, 
            charger, accessories, created_at, updated_at
        FROM products
        WHERE 1=1
        """
        params = []
        
        if category:
            query += " AND category = %s"
            params.append(category)
            
        if brand:
            query += " AND brand = %s"
            params.append(brand)
            
        query += " ORDER BY category, brand, item_description"
        
        cur.execute(query, params)
        products = cur.fetchall()
        
        # Convert to list of dicts
        result = []
        for row in products:
            product = dict(row)
            # Convert datetime objects to strings for JSON serialization
            product['created_at'] = product['created_at'].isoformat() if product['created_at'] else None
            product['updated_at'] = product['updated_at'].isoformat() if product['updated_at'] else None
            result.append(product)
            
        cur.close()
        conn.close()
        
        return jsonify({"products": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        
        cur.execute("""
        SELECT 
            id, category, brand, item_description, sku, 
            screen_size_in, touchscreen, storage_tb, memory_gb, 
            charger, accessories, created_at, updated_at
        FROM products
        WHERE id = %s
        """, (product_id,))
        
        product = cur.fetchone()
        
        if product:
            result = dict(product)
            # Convert datetime objects to strings for JSON serialization
            result['created_at'] = result['created_at'].isoformat() if result['created_at'] else None
            result['updated_at'] = result['updated_at'].isoformat() if result['updated_at'] else None
            
            cur.close()
            conn.close()
            
            return jsonify({"product": result})
        else:
            cur.close()
            conn.close()
            return jsonify({"error": "Product not found"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('APP_PORT', 8000)), debug=os.environ.get('DEBUG', 'False').lower() == 'true')
