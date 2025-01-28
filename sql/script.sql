DROP TABLE IF EXISTS realiser CASCADE;
DROP TABLE IF EXISTS creer CASCADE;
DROP TABLE IF EXISTS validation CASCADE;
DROP TABLE IF EXISTS interaction CASCADE;
DROP TABLE IF EXISTS historique CASCADE;
DROP TABLE IF EXISTS information CASCADE;
DROP TABLE IF EXISTS utilisateur CASCADE;
DROP TABLE IF EXISTS type_historique CASCADE;
DROP TABLE IF EXISTS type_interaction CASCADE;
DROP TABLE IF EXISTS type_information CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS exercice CASCADE;

CREATE TABLE IF NOT EXISTS exercice (
   ex_id SERIAL PRIMARY KEY,
   ex_nom VARCHAR(200) NOT NULL,
   ex_inspiration INT,
   ex_apnee INT,
   ex_expiration INT,
   ex_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS role (
   role_id SERIAL PRIMARY KEY,
   role_nom VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS type_information (
   type_info_id SERIAL PRIMARY KEY,
   type_info_nom VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS type_interaction (
   type_inter_id SERIAL PRIMARY KEY,
   type_inter_libelle VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS type_historique (
   type_histo_id SERIAL PRIMARY KEY,
   type_histo_libelle VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS utilisateur (
   ut_id SERIAL PRIMARY KEY,
   ut_nom VARCHAR(255) NOT NULL,
   ut_prenom VARCHAR(200) NOT NULL,
   ut_mail VARCHAR(255) UNIQUE NOT NULL,
   ut_password VARCHAR(255) NOT NULL,
   ut_active BOOLEAN DEFAULT FALSE NOT NULL,
   role_id INT NOT NULL,
   FOREIGN KEY (role_id) REFERENCES role(role_id)
);

CREATE TABLE IF NOT EXISTS information (
   info_id SERIAL PRIMARY KEY,
   info_titre VARCHAR(255) NOT NULL,
   info_description TEXT NOT NULL,
   info_contenu TEXT NOT NULL,
   info_active BOOLEAN DEFAULT FALSE NOT NULL,
   type_info_id INT NOT NULL,
   FOREIGN KEY (type_info_id) REFERENCES type_information(type_info_id)
);

CREATE TABLE IF NOT EXISTS historique (
   histo_id SERIAL PRIMARY KEY,
   histo_id_obj INT NOT NULL,
   histo_nom_table VARCHAR(100),
   histo_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   histo_ancienne_valeur TEXT NOT NULL,
   histo_nouvelle_valeur TEXT NOT NULL ,
   type_histo_id INT NOT NULL,
   FOREIGN KEY (type_histo_id) REFERENCES type_historique(type_histo_id)
);

CREATE TABLE IF NOT EXISTS interaction (
   inter_id SERIAL PRIMARY KEY,
   inter_date_de_debut TIMESTAMP NOT NULL,
   inter_date_de_fin TIMESTAMP,
   info_id INT NOT NULL,
   type_inter_id INT NOT NULL,
   ex_id INT NOT NULL,
   ut_id INT NOT NULL,
   FOREIGN KEY (info_id) REFERENCES information(info_id),
   FOREIGN KEY (type_inter_id) REFERENCES type_interaction(type_inter_id),
   FOREIGN KEY (ex_id) REFERENCES exercice(ex_id),
   FOREIGN KEY (ut_id) REFERENCES utilisateur(ut_id)
);

CREATE TABLE IF NOT EXISTS validation (
   valid_id SERIAL PRIMARY KEY,
   validation_token VARCHAR(255) NOT NULL,
   date_expiration_token TIMESTAMP NOT NULL,
   type_validation VARCHAR(100) NOT NULL,
   ut_id INT NOT NULL,
   FOREIGN KEY (ut_id) REFERENCES utilisateur(ut_id)
);

CREATE TABLE IF NOT EXISTS realiser (
   ut_id INT NOT NULL,
   ex_id INT NOT NULL,
   PRIMARY KEY (ut_id, ex_id),
   FOREIGN KEY (ut_id) REFERENCES utilisateur(ut_id),
   FOREIGN KEY (ex_id) REFERENCES exercice(ex_id)
);

CREATE TABLE IF NOT EXISTS creer (
   ut_id INT NOT NULL,
   info_id INT NOT NULL,
   PRIMARY KEY (ut_id, info_id),
   FOREIGN KEY (ut_id) REFERENCES utilisateur(ut_id),
   FOREIGN KEY (info_id) REFERENCES information(info_id)
);
