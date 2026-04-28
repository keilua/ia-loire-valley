-- ============================================================
-- IA Loire Valley — Schéma Supabase
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- ============================================================

-- ── Types ENUM ──────────────────────────────────────────────

create type event_type as enum ('Conférence', 'Atelier', 'Webinaire', 'Networking');
create type expert_level as enum ('Conseil', 'Accompagnement', 'Formation', 'Développement');
create type news_category as enum ('IA générative', 'Industrie', 'Réglementation', 'Outils', 'Territoire', 'Innovation');
create type training_level as enum ('Débutant', 'Intermédiaire', 'Avancé');
create type training_format as enum ('En ligne', 'Présentiel', 'Mixte');
create type training_profile as enum ('Dirigeants', 'Managers / Métiers', 'Profils techniques', 'Collectivités');

-- ── Table : events ──────────────────────────────────────────

create table events (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  date       date not null,
  location   text not null,
  type       event_type not null,
  summary    text not null,
  link       text,
  is_past    boolean not null default false,
  image      text,
  created_at timestamptz default now()
);

-- Mise à jour automatique de is_past chaque nuit (via pg_cron ou à la main)
-- Optionnel : create index events_date_idx on events(date);

-- ── Table : experts ─────────────────────────────────────────

create table experts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  avatar      text not null,
  specialty   text not null,
  location    text not null,
  sectors     text[] not null default '{}',
  expertise   text[] not null default '{}',
  level       expert_level not null,
  description text not null,
  website     text,
  email       text,
  created_at  timestamptz default now()
);

-- ── Table : news ────────────────────────────────────────────

create table news (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  category   news_category not null,
  date       date not null,
  summary    text not null,
  image      text,
  read_time  integer not null default 3,
  is_hero    boolean not null default false,
  created_at timestamptz default now()
);

-- ── Table : trainings ───────────────────────────────────────

create table trainings (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  provider   text not null,
  level      training_level not null,
  format     training_format not null,
  profile    training_profile not null,
  objective  text not null,
  duration   text not null,
  link       text,
  created_at timestamptz default now()
);

-- ── Row Level Security (lecture publique) ───────────────────

alter table events   enable row level security;
alter table experts  enable row level security;
alter table news     enable row level security;
alter table trainings enable row level security;

create policy "Lecture publique events"    on events    for select using (true);
create policy "Lecture publique experts"   on experts   for select using (true);
create policy "Lecture publique news"      on news      for select using (true);
create policy "Lecture publique trainings" on trainings for select using (true);

-- ── Seed : Events (données réelles ia-loirevalley.fr) ───────

insert into events (title, date, location, type, summary, link, is_past) values
  ('CAF''DATA #12 : IA – Par où commencer pour ne pas se planter ?', '2025-07-09', 'CODA – École d''informatique, Orléans', 'Atelier', 'Les clés pour construire une stratégie IA concrète et adaptée à votre organisation. Atelier pratique de 2h animé par des experts.', 'https://ia-loirevalley.fr/agenda/cafdata-12-ia-par-ou-commencer-pour-ne-pas-se-planter/', true),
  ('Journée Expert – L''IA au service des territoires', '2025-06-24', 'Centre de Création Contemporaine Olivier Debré (CCCOD), Tours', 'Conférence', 'Une journée complète pour explorer comment l''IA peut transformer les services publics et accompagner le développement des territoires. 8h30–16h30.', 'https://ia-loirevalley.fr/agenda/journee-expert-lia-au-service-des-territoires/', true),
  ('Festival Re{Dé}connecte – Arts hybrides & cultures numériques', '2025-06-17', 'Centre-Val de Loire', 'Conférence', 'Festival de 5 jours autour des arts hybrides, des cultures numériques et de l''intelligence artificielle dans la création contemporaine.', 'https://ia-loirevalley.fr/agenda/festival-redeconnecte-arts-hybrides-cultures-numeriques/', true),
  ('Intelligence Artificielle : Mythes et Réalités', '2025-06-11', 'CRIJ Centre-Val de Loire', 'Conférence', 'Envie de découvrir ce que l''IA change vraiment dans nos vies ? Une conférence grand public pour démêler le vrai du faux. 14h–17h.', 'https://ia-loirevalley.fr/agenda/intelligence-artificielle-mythes-et-realites/', true),
  ('Tournée Régionale – Place du Numérique', '2025-05-06', 'Centre-Val de Loire (itinérant)', 'Conférence', 'Événement grand public et gratuit sur les métiers et enjeux du numérique. Tournée dans plusieurs villes du 6 mai au 5 juin, 13h–19h.', 'https://ia-loirevalley.fr/agenda/tournee-regionale-place-du-numerique/', true),
  ('French Tech Tour Centre-Val de Loire', '2025-04-29', 'Centre-Val de Loire (itinérant)', 'Networking', 'Mise à l''honneur des startups régionales et du développement innovant. En partenariat avec Digital Loire Valley.', 'https://ia-loirevalley.fr/agenda/french-tech-tour-centre-val-de-loire-en-partenariat-avec-digital-loire-valley/', true),
  ('Journée « L''IA au service du Droit »', '2025-04-09', 'Centre-Val de Loire', 'Conférence', 'L''intelligence artificielle transforme le monde du droit : quels défis et opportunités ? Journée thématique 9h30–17h.', 'https://ia-loirevalley.fr/agenda/journee-lia-au-service-du-droit/', true),
  ('Les Rencontres de la donnée', '2025-04-03', 'Orléans', 'Networking', 'Matinée de networking et d''échanges autour des enjeux de la donnée pour les entreprises et collectivités de la région. 9h–14h.', 'https://ia-loirevalley.fr/agenda/les-rencontres-de-la-donnee-le-3-avril-a-orleans/', true),
  ('CAF''DATA #11 : Vos données ont de la valeur… et des prédateurs !', '2025-04-02', 'LAB''O Village By CA, Orléans', 'Atelier', 'Sécurité numérique et économique pour professionnels et acteurs du numérique. Comment protéger vos données ? 9h–11h.', 'https://ia-loirevalley.fr/agenda/cafdata-11-vos-donnees-ont-de-la-valeur-et-des-predateurs/', true),
  ('L''IA va-t-elle sauver le monde ?', '2025-03-27', 'Amphithéâtre Jousse, Faculté de Droit', 'Conférence', '« Tribunal pour les Générations Futures » organisé par Usbek & Rica. Un format inédit pour débattre du rôle de l''IA dans les défis de demain. 14h–16h.', 'https://ia-loirevalley.fr/agenda/lia-va-t-elle-sauver-le-monde/', true),
  ('CAF DATA #9 à Tours', '2024-11-07', 'Tours', 'Atelier', 'Atelier CAF DATA en partenariat avec le GRETA Centre-Val de Loire. Session pratique autour des usages de la donnée. 8h30–10h30.', 'https://ia-loirevalley.fr/agenda/caf-data-9-a-tours/', true),
  ('CONNEXION DAY – 4ème édition', '2024-05-30', 'LAB''O Village by CA, Orléans', 'Networking', 'Deux jours dédiés aux tendances en transformation digitale et au développement des compétences numériques. 30–31 mai 2024.', null, true),
  ('IA au service de l''efficience', '2024-12-31', 'Centre-Val de Loire', 'Conférence', 'Appel à manifestation d''intérêt pour les entreprises souhaitant explorer les usages de l''IA dans l''optimisation de leurs processus.', 'https://ia-loirevalley.fr/agenda/893/', true);

-- ── Seed : Experts ──────────────────────────────────────────

insert into experts (name, avatar, specialty, location, sectors, expertise, level, description, email) values
  ('Sophie Marchand', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie', 'Stratégie IA & Transformation digitale', 'Orléans', array['Industrie','Logistique','Services'], array['Conseil','Feuille de route IA','Change management'], 'Conseil', 'Accompagne les PME et ETI dans la définition de leur stratégie IA, l''identification des cas d''usage prioritaires et la conduite du changement.', 'sophie.marchand@example.com'),
  ('Thomas Rivière', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas', 'Data Science & Machine Learning', 'Tours', array['Santé','Finance','Retail'], array['Machine Learning','Deep Learning','NLP'], 'Développement', 'Expert en data science et machine learning avec plus de 10 ans d''expérience. Spécialisé dans le traitement du langage naturel et la vision par ordinateur.', 'thomas.riviere@example.com'),
  ('Isabelle Fontaine', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabelle', 'IA appliquée aux RH & Recrutement', 'Blois', array['RH','Formation','Services'], array['IA RH','Automatisation','Analytics RH'], 'Accompagnement', 'Spécialiste de l''application de l''IA dans les processus RH : recrutement prédictif, gestion des talents, automatisation des tâches administratives.', 'isabelle.fontaine@example.com'),
  ('Marc Dubois', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marc', 'IA industrielle & Maintenance prédictive', 'Châteauroux', array['Industrie','Énergie','BTP'], array['IoT','Maintenance prédictive','Vision industrielle'], 'Développement', 'Développe des solutions d''IA pour l''industrie 4.0 : détection de défauts, maintenance prédictive, optimisation de la production.', 'marc.dubois@example.com'),
  ('Céline Moreau', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Celine', 'IA & Secteur public / Collectivités', 'Orléans', array['Collectivités','Éducation','Mobilité'], array['Service public','Open data','Smart city'], 'Conseil', 'Accompagne les collectivités dans leur transformation numérique et l''intégration de l''IA dans les services publics.', 'celine.moreau@example.com'),
  ('Alexandre Petit', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre', 'Formation IA & Montée en compétences', 'Tours', array['Formation','RH','Industrie'], array['Formation','Sensibilisation','Ateliers pratiques'], 'Formation', 'Formateur certifié en IA, il conçoit et anime des programmes de montée en compétences adaptés à tous les profils.', 'alexandre.petit@example.com'),
  ('Nathalie Bernard', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nathalie', 'IA générative & Automatisation', 'Bourges', array['Communication','Marketing','Services'], array['IA générative','Automatisation','Prompt engineering'], 'Accompagnement', 'Aide les entreprises à intégrer les outils d''IA générative dans leurs workflows : automatisation de contenu, service client, productivité.', 'nathalie.bernard@example.com'),
  ('Julien Leroy', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julien', 'Data Engineering & Infrastructure IA', 'Tours', array['Tech','Finance','Industrie'], array['Data pipeline','MLOps','Cloud IA'], 'Développement', 'Architecte data et MLOps, spécialisé dans la mise en place d''infrastructures IA robustes et scalables.', 'julien.leroy@example.com');

-- ── Seed : News ─────────────────────────────────────────────

insert into news (title, category, date, summary, image, read_time, is_hero) values
  ('5 entreprises de la région ont transformé leur production grâce à l''IA — voici comment', 'Territoire', '2025-04-14', 'Portrait croisé de cinq PME et ETI du Centre-Val de Loire qui ont réussi leur virage IA. Des résultats concrets, des témoignages directs et des enseignements à retenir.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', 6, true),
  ('Qu''est-ce que l''IA Act et pourquoi votre entreprise doit s''y préparer dès maintenant', 'Réglementation', '2025-04-10', 'Le règlement européen sur l''intelligence artificielle entre progressivement en vigueur. Voici les obligations clés et les premières actions à mettre en place.', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80', 5, false),
  ('Mistral, GPT-4o, Gemini : quel LLM choisir pour votre entreprise en 2025 ?', 'Outils', '2025-04-07', 'Comparatif pratique des principaux modèles de langage disponibles pour les entreprises : performances, coûts, cas d''usage et critères de choix.', null, 7, false),
  ('La maintenance prédictive par IA s''impose dans l''industrie de la région', 'Industrie', '2025-04-03', 'Plusieurs fabricants d''Indre-et-Loire et du Cher ont adopté des solutions IA pour anticiper les pannes. Bilan chiffré et retours d''expérience.', 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80', 4, false),
  ('IA générative : comment les équipes marketing s''en emparent', 'IA générative', '2025-03-28', 'Rédaction, image, vidéo, SEO... L''IA générative transforme les pratiques marketing. Retour sur les usages qui créent vraiment de la valeur.', null, 5, false),
  ('Open source et IA : la région soutient deux nouvelles initiatives', 'Innovation', '2025-03-24', 'La Région Centre-Val de Loire finance deux projets IA open source issus de startups locales. Présentation des porteurs de projets et de leurs ambitions.', 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80', 3, false),
  ('Former ses équipes à l''IA : quels dispositifs existent en Centre-Val de Loire ?', 'Territoire', '2025-03-19', 'Tour d''horizon des aides, financements et organismes disponibles pour accompagner la montée en compétences IA dans les entreprises régionales.', null, 6, false);

-- ── Seed : Trainings ────────────────────────────────────────

insert into trainings (title, provider, level, format, profile, objective, duration, link) values
  ('IA pour dirigeants : comprendre, décider, agir', 'CCI Centre-Val de Loire', 'Débutant', 'Présentiel', 'Dirigeants', 'Comprendre les enjeux et opportunités de l''IA pour piloter une stratégie et prendre des décisions éclairées.', '1 journée', 'https://example.com'),
  ('Initiation à l''IA générative pour managers', 'Digital Loire Valley', 'Débutant', 'En ligne', 'Managers / Métiers', 'Découvrir les outils d''IA générative et identifier les cas d''usage métier à fort potentiel.', '3h en ligne', 'https://example.com'),
  ('Python & Machine Learning – Fondamentaux', 'INSA Centre-Val de Loire', 'Intermédiaire', 'Mixte', 'Profils techniques', 'Maîtriser les bases du machine learning avec Python : sklearn, pandas, visualisation.', '3 jours', 'https://example.com'),
  ('IA et service public : enjeux et usages', 'CNFPT', 'Débutant', 'En ligne', 'Collectivités', 'Comprendre les applications de l''IA dans les collectivités et les enjeux réglementaires associés.', '2h en ligne', 'https://example.com'),
  ('Deep Learning & Réseaux de neurones', 'Université de Tours', 'Avancé', 'Présentiel', 'Profils techniques', 'Maîtriser les architectures de deep learning : CNN, RNN, Transformers et leur déploiement.', '5 jours', 'https://example.com'),
  ('Automatiser ses processus avec l''IA – sans coder', 'BPI Formation', 'Débutant', 'En ligne', 'Managers / Métiers', 'Utiliser des outils no-code pour automatiser des tâches répétitives grâce à l''IA.', '4h en ligne', 'https://example.com'),
  ('Stratégie data pour décideurs', 'CCI Loire', 'Intermédiaire', 'Présentiel', 'Dirigeants', 'Construire une stratégie data orientée valeur, comprendre le rôle des données dans une démarche IA.', '2 jours', 'https://example.com'),
  ('IA et marchés publics : ce que ça change', 'ADGCF', 'Intermédiaire', 'Mixte', 'Collectivités', 'Intégrer l''IA dans les achats et marchés publics tout en respectant le cadre légal.', '1 journée', 'https://example.com');
