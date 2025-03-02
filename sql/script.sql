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

CREATE TABLE
   IF NOT EXISTS exercice (
      ex_id SERIAL PRIMARY KEY,
      ex_nom VARCHAR(200) NOT NULL,
      ex_description VARCHAR(255) NOT NULL,
      ex_difficulty VARCHAR(50) NOT NULL,
      ex_duration INT CHECK (ex_duration > 0), 
      ex_benefits JSONB, 
      ex_inspiration INT CHECK (ex_inspiration >= 0),
      ex_apnee INT CHECK (ex_apnee >= 0),
      ex_expiration INT CHECK (ex_expiration >= 0),
      ex_active BOOLEAN DEFAULT FALSE NOT NULL
   );

CREATE TABLE
   IF NOT EXISTS role (
      role_id SERIAL PRIMARY KEY,
      role_nom VARCHAR(100) NOT NULL
   );

CREATE TABLE
   IF NOT EXISTS type_information (
      type_info_id SERIAL PRIMARY KEY,
      type_info_nom VARCHAR(100) NOT NULL
   );

CREATE TABLE
   IF NOT EXISTS type_interaction (
      type_inter_id SERIAL PRIMARY KEY,
      type_inter_libelle VARCHAR(100) NOT NULL
   );

CREATE TABLE
   IF NOT EXISTS type_historique (
      type_histo_id SERIAL PRIMARY KEY,
      type_histo_libelle VARCHAR(100) NOT NULL
   );

CREATE TABLE IF NOT EXISTS utilisateur (
  ut_id SERIAL PRIMARY KEY,
  ut_nom VARCHAR(255) NOT NULL,
  ut_prenom VARCHAR(200) NOT NULL,
  ut_mail VARCHAR(255) UNIQUE NOT NULL,
  ut_mail_anonymized VARCHAR(255) UNIQUE,
  ut_password VARCHAR(255) NOT NULL,
  ut_active BOOLEAN DEFAULT FALSE NOT NULL,
  role_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES role (role_id)
);

CREATE TABLE
   IF NOT EXISTS information (
      info_id SERIAL PRIMARY KEY,
      info_titre VARCHAR(255) NOT NULL,
      info_description TEXT NOT NULL,
      info_contenu TEXT NOT NULL,
      info_active BOOLEAN DEFAULT FALSE NOT NULL,
      type_info_id INT NOT NULL,
      ut_id INT NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (ut_id) REFERENCES utilisateur (ut_id),
      FOREIGN KEY (type_info_id) REFERENCES type_information (type_info_id)
   );

CREATE TABLE
   IF NOT EXISTS historique (
      histo_id SERIAL PRIMARY KEY,
      histo_id_obj INT,
      histo_nom_table VARCHAR(100),
      histo_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      histo_ancienne_valeur TEXT,
      histo_nouvelle_valeur TEXT,
      type_histo_id INT,
      FOREIGN KEY (type_histo_id) REFERENCES type_historique (type_histo_id)
   );

CREATE TABLE
   IF NOT EXISTS interaction (
      inter_id SERIAL PRIMARY KEY,
      inter_date_de_debut TIMESTAMP NOT NULL,
      inter_date_de_fin TIMESTAMP,
      info_id INT,
      type_inter_id INT NOT NULL,
      ex_id INT,
      ut_id INT,
      FOREIGN KEY (info_id) REFERENCES information (info_id),
      FOREIGN KEY (type_inter_id) REFERENCES type_interaction (type_inter_id),
      FOREIGN KEY (ex_id) REFERENCES exercice (ex_id),
      FOREIGN KEY (ut_id) REFERENCES utilisateur (ut_id)
   );

CREATE TABLE
   IF NOT EXISTS validation (
      valid_id SERIAL PRIMARY KEY,
      validation_token TEXT UNIQUE NOT NULL,
      date_expiration_token TIMESTAMP NOT NULL,
      type_validation VARCHAR(100) NOT NULL,
      ut_id INT UNIQUE NOT NULL,
      FOREIGN KEY (ut_id) REFERENCES utilisateur (ut_id)
   );

CREATE TABLE
   IF NOT EXISTS realiser (
      ut_id INT NOT NULL,
      ex_id INT NOT NULL,
      PRIMARY KEY (ut_id, ex_id),
      FOREIGN KEY (ut_id) REFERENCES utilisateur (ut_id),
      FOREIGN KEY (ex_id) REFERENCES exercice (ex_id)
   );

CREATE TABLE
   IF NOT EXISTS creer (
      ut_id INT NOT NULL,
      info_id INT NOT NULL,
      PRIMARY KEY (ut_id, info_id),
      FOREIGN KEY (ut_id) REFERENCES utilisateur (ut_id),
      FOREIGN KEY (info_id) REFERENCES information (info_id)
   );

CREATE OR REPLACE FUNCTION log_interaction_trigger()
RETURNS TRIGGER AS $$
DECLARE
    dynamic_type_histo_id INT;
BEGIN
    IF NEW.inter_date_de_fin IS NULL THEN
       SELECT type_histo_id 
         INTO dynamic_type_histo_id 
         FROM type_historique 
         WHERE type_histo_libelle = 'Interaction Créée'
         LIMIT 1;
    ELSE
       SELECT type_histo_id 
         INTO dynamic_type_histo_id 
         FROM type_historique 
         WHERE type_histo_libelle = 'Interaction Terminée'
         LIMIT 1;
    END IF;

    INSERT INTO historique (
       histo_id_obj,
       histo_nom_table,
       histo_date,
       histo_ancienne_valeur,
       histo_nouvelle_valeur,
       type_histo_id
    )
    VALUES (
       NEW.inter_id,
       'interaction',
       NOW(),
       '', 
       row_to_json(NEW)::text,
       dynamic_type_histo_id
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_interaction
AFTER INSERT ON interaction
FOR EACH ROW
EXECUTE FUNCTION log_interaction_trigger();

CREATE OR REPLACE FUNCTION anonymize_utilisateur(p_ut_id INT)
RETURNS VOID AS $$
DECLARE
  original_email TEXT;
  local_part TEXT;
  domain TEXT;
  anonymized_local TEXT;
BEGIN
  -- Récupère l'email actuel de l'utilisateur depuis la colonne ut_mail
  SELECT ut_mail INTO original_email
  FROM utilisateur
  WHERE ut_id = p_ut_id;

  IF original_email IS NULL THEN
    RAISE EXCEPTION 'Aucune adresse email trouvée pour l''utilisateur %', p_ut_id;
  END IF;

  -- Sépare la partie locale et le domaine de l'email
  local_part := split_part(original_email, '@', 1);
  domain := split_part(original_email, '@', 2);

  -- Si la partie locale comporte plus de 2 caractères,
  -- on conserve la première et la dernière lettre et on masque le reste
  IF char_length(local_part) > 2 THEN
    anonymized_local := substring(local_part from 1 for 1)
      || repeat('*', char_length(local_part) - 2)
      || substring(local_part from char_length(local_part) for 1);
  ELSE
    -- Si elle est trop courte, on masque tout sauf le premier caractère
    anonymized_local := substring(local_part from 1 for 1) || repeat('*', char_length(local_part) - 1);
  END IF;

  -- Met à jour la colonne d'email anonymisé et les champs nominatif
  UPDATE utilisateur
  SET 
    ut_nom = 'Anonymisé',
    ut_prenom = 'Anonymisé',
    ut_mail_anonymized = anonymized_local || '@' || domain
  WHERE ut_id = p_ut_id;
END;
$$ LANGUAGE plpgsql;
