-- User Management
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    imageUrl VARCHAR(255),
    password TEXT NOT NULL,
    phoneNumber VARCHAR(15),
    active BOOLEAN DEFAULT TRUE,
    passwordResetToken TEXT,
    passwordResetExpiresAt DATE,
    hashedRandomToken TEXT,
    emailTokenExpiresAt DATE,
    role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('admin', 'employee', 'customer', 'supplier')) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Management
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    description TEXT,
    stock_level INTEGER NOT NULL DEFAULT 0,
    supplier_id INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory_movements (
    id SERIAL PRIMARY KEY,
    inventory_id INT REFERENCES inventory(id) ON DELETE CASCADE,
    movement_type VARCHAR(50) CHECK (movement_type IN ('in', 'out')) NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Accounting and Finance
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(100) NOT NULL UNIQUE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('pending', 'paid', 'cancelled')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    incurred_by INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Management
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    created_by INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    assigned_to INT REFERENCES users(id) ON DELETE SET NULL,
    task_name VARCHAR(150) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('pending', 'in-progress', 'completed')) DEFAULT 'pending',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer Relationship Management (CRM)
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    status VARCHAR(50) CHECK (status IN ('new', 'contacted', 'converted', 'closed')) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interactions (
    id SERIAL PRIMARY KEY,
    lead_id INT REFERENCES leads(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    interaction_type VARCHAR(100),
    notes TEXT,
    interaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customer_data (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id) ON DELETE CASCADE,
    data_key VARCHAR(150) NOT NULL,
    data_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);