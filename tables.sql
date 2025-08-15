CREATE TABLE hero_section (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  subtitle VARCHAR(255),
  description TEXT,
  rating FLOAT,
  reviews INT,
  microelements VARCHAR(255),
  weight VARCHAR(50),
  product_name VARCHAR(255),
  badge VARCHAR(50)
);

CREATE TABLE why (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255)
);


CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    job VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    count TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL
);

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  icon VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL
);

CREATE TABLE certificates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  massa VARCHAR(100) NOT NULL,
  month VARCHAR(100) NOT NULL,
  description TEXT,
  price VARCHAR(100) NOT NULL,
  old_price VARCHAR(100),
  span VARCHAR(100)
);

CREATE TABLE whom (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(255),
    icon VARCHAR(100) ,
    who VARCHAR(255) NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    benefits JSON NOT NULL
);


CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    type_id INT NOT NULL,
    status ENUM('pending', 'approved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES prices(id) ON DELETE CASCADE
);



CREATE TABLE superior (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  minTitle VARCHAR(255) NOT NULL,
  subTitle VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  fields JSON NOT NULL
);
