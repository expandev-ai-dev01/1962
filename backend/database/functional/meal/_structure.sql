-- Create table for Meals
CREATE TABLE meals (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id UNIQUEIDENTIFIER NOT NULL,
    meal_date DATE NOT NULL,
    meal_time TIME NOT NULL,
    category NVARCHAR(50) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Create table for Meal Items
CREATE TABLE meal_items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    meal_id INT NOT NULL,
    food_name NVARCHAR(100) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit NVARCHAR(50) NOT NULL,
    calories DECIMAL(10,2) DEFAULT 0,
    protein DECIMAL(10,2) DEFAULT 0,
    carbohydrates DECIMAL(10,2) DEFAULT 0,
    fats DECIMAL(10,2) DEFAULT 0,
    source NVARCHAR(20) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_MealItems_Meals FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE
);

-- Create index for searching meals by user and date
CREATE INDEX IX_Meals_UserId_Date ON meals(user_id, meal_date);