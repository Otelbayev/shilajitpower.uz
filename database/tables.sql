-- ===============================
-- HERO SECTION
-- ===============================
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

INSERT INTO hero_section (id, title, subtitle, description, rating, reviews, microelements, weight, product_name, badge) VALUES
(1, 'SHILAJIT POWER', 'Tabiiy kuch. Energiya. Erkaklar salomatligi uchun yechim.', "🏔️ Tog'larning qudrati sizning kuchingiz uchun", 4.9, 2218, '85+ mikroelement | Fulvik kislota | Gumat kislota', '50g', 'SHILAJIT POWER', 'Premium Himalayan Resin');

-- ===============================
-- WHY
-- ===============================
CREATE TABLE why (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255)
);

INSERT INTO why (id, title, description, icon) VALUES
(1, 'Testosteronni oshiradi', "Erkaklik gormonini tabiiy yo'l bilan kuchaytiradi va jinsiy salomatlikni yaxshilaydi", NULL),
(2, 'Energiyani tiklaydi', 'Jismoniy va mental energiyani oshiradi, kundalik faoliyat uchun kuch beradi', NULL),
(3, 'Charchoqni kamaytiradi', 'Stress va charchoqni bartaraf etadi, qayta tiklanish jarayonini tezlashtiradi', NULL),
(4, 'Fokus va mental hushyorlikni kuchaytiradi', 'Aqliy qobiliyat va diqqat konsentratsiyasini sezilarli darajada oshiradi', NULL),
(5, "Detoksifikatsiyani rag'batlantiradi", 'Organizmni zararli moddalardan tozalaydi va metabolizm jarayonlarini yaxshilaydi', NULL),
(6, 'Hujayra regeneratsiyasini faollashtiradi', "To'qimalarning yangilanishini tezlashtiradi va qarish jarayonini sekinlashtiradi", NULL);

-- ===============================
-- COMMENTS
-- ===============================
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    job VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO comments (id, fullname, job, comment, image, created_at) VALUES
(1, 'Anvar Karimov', '34 yosh, Sportchi', '2 oy ichida energiyam sezilarli oshdi. Sport zaliga borish osonlashdi va ishda ham charchamayman. Juda tavsiya qilaman!', NULL, '2025-08-15 14:48:32'),
(2, 'Bobur Rahmonov', '28 yosh, IT mutaxassis', "Shilajit POWER haqiqatan ham ishlaydi! Kuch va energiya oshdi, uyqum ham yaxshilandi. 3 oy ichida zo'r natija", NULL, '2025-08-15 14:48:32'),
(3, 'Sardor Mirzaev', '40 yosh, Biznesmen', '40 yoshda ham yosh his qilyapman. Charchoq ketdi, ishtaha kirdi. Oila ham farqni sezdi. Rahmat Shilajit POWER!', NULL, '2025-08-15 14:48:32'),
(4, 'Jasur Toshmatov', '36 yosh, Murabbiy', "Sport bilan shug'ullanvchiman. Shilajit POWER orqali tiklanish tezlashdi va kuch oshdi. Zo'r mahsulot!", NULL, '2025-08-15 14:48:32'),
(5, 'Otabek Nazarov', '29 yosh, Menejer', 'Ish stressidan charchamayman endi. Energiya to‘la, fokus yaxshi. Kundalik hayot osonlashdi va kayfiyat yaxshi.', NULL, '2025-08-15 14:48:32'),
(6, 'Rustam Ismoilov', '45 yosh, Shifokor', "45 yoshda shunday energiya bor edimi! Tabiyat sovg'asi bu. Pulimga arzidi. Hammaga tavsiya qilaman.", NULL, '2025-08-15 14:48:32');

-- ===============================
-- STATISTICS
-- ===============================
CREATE TABLE statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    count TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO statistics (id, count, description) VALUES
(1, '100%', 'Tabiiy tarkib'),
(2, '99.5%', 'Tozalik darajasi'),
(3, '0', "Yon ta'sirlar"),
(4, '5000m+', 'Balandlik'),
(5, '2,218+', 'Mamnun mijozlar'),
(6, '4.9', "O'rtacha reyting"),
(7, '97%', 'Ijobiy natija'),
(8, '15+', "Davlatlar bo'yicha");

-- ===============================
-- QUESTIONS
-- ===============================
CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL
);

INSERT INTO questions (id, question, answer) VALUES
(1, 'Qanday foydalaniladi?', 'Shilajit POWER kuniga bir marta, ertalab ovqatdan oldin ishlatiladi. Bir dona kapsula (500mg) yetarli. Iliq suv bilan qabul qiling. Eng yaxshi natija uchun kamida 2-3 oy davomida muntazam ishlatish tavsiya etiladi.'),
(2, "Yon ta'siri bormi?", "Shilajit POWER 100% tabiiy mahsulot bo'lib, to'g'ri dozada ishlatilganda yon ta'sirlar juda kam uchraydi. Ba'zi odamlarda boshlanishda engil bosh og'riq yoki me'da bezovtaligi bo'lishi mumkin. Agar siz biror dori-darmonlarni qabul qilsangiz, shifokor bilan maslahatlashing."),
(3, 'Qachon natija beradi?', "Ko'pchilik odamlar 2-3 hafta ichida birinchi o'zgarishlarni sezadilar - energiya oshishi, kayfiyatning yaxshilanishi. To'liq natijalar (testosteron oshishi, kuch oshishi) 6-8 hafta ichida namoyon bo'ladi. Eng yaxshi samara uchun 3 oylik kursni tavsiya qilamiz."),
(4, 'Nima uchun Shilajit POWER?', "Bizning mahsulotimiz Himalay tog'larining 5000+ metr balandligidan olinadi va 99.5% tozalikka ega. FDA, HACCP, Halal sertifikatlariga ega. Fulvik va gumat kislotalarining yuqori konsentratsiyasi, 85+ mikroelement mavjudligi bilan ajralib turadi. Bundan tashqari, 30 kunlik pulni qaytarish kafolati beramiz.");

-- ===============================
-- CONTACTS
-- ===============================
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  icon VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL
);

INSERT INTO contacts (id, icon, name, link) VALUES
(1, '+998 (90) 123-45-67', 'Telefon', 'tel:+998901234567'),
(2, '@ShilajitPowerUz', 'Telegram', 'https://t.me/ShilajitPowerUz'),
(3, '@shilajit_power_uz', 'Instagram', 'https://instagram.com/shilajit_power_uz'),
(4, 'info@shilajitpower.uz', 'Email', 'mailto:info@shilajitpower.uz');

-- ===============================
-- CERTIFICATES
-- ===============================
CREATE TABLE certificates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO certificates (id, image, title, subtitle, description) VALUES
(1, NULL, 'FDA FFR', 'Food Facility Registration', "AQSh FDA tomonidan ro'yxatga olingan ishlab chiqarish"),
(2, NULL, 'Halal', 'Sertifikat', 'Indoneziya Respublikasi Halal sertifikati'),
(3, NULL, 'HACCP', 'System Certificate', 'Xavf tahlili va kritik nazorat nuqtalari tizimi'),
(4, NULL, '100% Natural', 'Ingredients', 'To‘liq tabiiy ingredientlar, kimyoviy qo‘shimchalar yo‘q');

-- ===============================
-- PRICES
-- ===============================
CREATE TABLE prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  massa VARCHAR(100) NOT NULL,
  month VARCHAR(100) NOT NULL,
  description TEXT,
  price VARCHAR(100) NOT NULL,
  old_price VARCHAR(100),
  span VARCHAR(100)
);

INSERT INTO prices (id, massa, month, description, price, old_price, span) VALUES
(1, '20g', '1 oy', "Sinab ko'rish uchun", '198.000', '', ''),
(2, '40g', '2 oy', 'Eng mashxur tanlov', '289.000', '396.000', '24% tejang'),
(3, '60g', '3 oy', "To'liq kurs uchun", '389.000', '594.000', 'Premium paket');

-- ===============================
-- WHOM
-- ===============================
CREATE TABLE whom (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(255),
    icon VARCHAR(100) ,
    who VARCHAR(255) NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    benefits JSON NOT NULL
);

INSERT INTO whom (id, image, icon, who, problem, solution, benefits) VALUES
(1, NULL, 'dumbbell', 'Sportchilar', 'Tez charchoq va tiklanish muammolari', 'Energiya va kuchni oshiradi, tiklanishni tezlashtiradi', '["Jismoniy bardoshlilikni oshiradi", "Mushak massasini ko‘payishini qo‘llab-quvvatlaydi", "Mashq orasidagi tiklanish vaqtini qisqartiradi"]'),
(2, NULL, 'briefcase', 'Ofis ishchilari', 'Mental charchoq va stress', 'Fokus va mental qobiliyatni kuchaytiradi', '["Diqqat konsentratsiyasini yaxshilaydi", "Ish stressini kamaytiradi", "Mental energiyani oshiradi"]'),
(3, NULL, 'user', 'Erkaklar 30+', 'Yosh bilan bog‘liq energiya kamayishi', 'Tabiiy ravishda testosteron va vitallikni qayta tiklaydi', '["Testosteron darajasini tabiiy oshiradi", "Umumiy vitallik va energiyani qayta tiklaydi", "Yosh his qilish va faollikni oshiradi"]');

-- ===============================
-- ORDERS
-- ===============================
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


-- ===============================
-- IMAGES
-- ===============================

CREATE TABLE images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  images LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL CHECK (json_valid(images)),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images (id, title, description, images) VALUES
(1, 'T-Max Shilajit', 'T-Max Shilajit is the purest, Himalayan shilajit—made for those who demand peak performance. Packed with fulvic acid and rare minerals, it naturally boosts testosterone, increases strength and fuels limitless energy.', NULL);


-- ===============================
-- SUPERIOR
-- ===============================
CREATE TABLE superior (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  minTitle VARCHAR(255) NOT NULL,
  subTitle VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  fields JSON NOT NULL
);

INSERT INTO superior (id, title, minTitle, subTitle, description, fields) VALUES
(1, 'Fulvik kislotasi', '15-20%', 'Fluvik', "Tabiiy mineral tashuvchi, hujayra membranalaridan o'tishni osonlashtiradi", '["Mineral so\'rilishini yaxshilaydi", "Antioksidant xossalari", "Detoksifikatsiya jarayonini kuchaytiradi"]'),
(2, 'Gumat kislotasi', '60-80%', 'Gumat', 'Asosiy faol modda, immunitet va metabolizmni boshqaradi', '["Immunitet tizimini mustahkamlaydi", "Antivirusa va antibakterial ta\'sir", "Yallig\'lanishga qarshi xossalar"]'),
(3, 'Smola shakli', '100%', 'Smola', 'Eng tozalangan va konsentrlangan shakl, maksimal samaradorlik', '["Eng yuqori biologik faollik", "Uzoq saqlash muddati", "Oson dozalash"]'),
(4, 'Himalay manbasi', 'Premium', 'Himalay', '5000+ metr balandlikdan olingan, ekologik toza muhit', '["Eng yuqori sifat", "Ifloslanishsiz", "Ming yillik shakllanish jarayoni"]');
