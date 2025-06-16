const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      
    database: 'Sallesport' 
});

// --- ABONNES ---
app.get('/abonnes', (req, res) => {
    db.query('SELECT * FROM abonnes', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});
app.get('/abonnes/:id', (req, res) => {
    db.query('SELECT * FROM abonnes WHERE id_abonne = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});
app.post('/abonnes', (req, res) => {
    const { nom, prenom, email, telephone, date_naissance, date_inscription } = req.body;

    // Avant d'insérer un abonné
    if (!nom || !prenom || !email) {
        return res.status(400).send('Champs obligatoires manquants');
    }

    db.query(
        'INSERT INTO abonnes (nom, prenom, email, telephone, date_naissance, date_inscription) VALUES (?, ?, ?, ?, ?, ?)',
        [nom, prenom, email, telephone, date_naissance, date_inscription],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, nom, prenom, email, telephone, date_naissance, date_inscription });
        }
    );
});
app.put('/abonnes/:id', (req, res) => {
    const { nom, prenom, email, telephone, date_naissance, date_inscription } = req.body;
    db.query(
        'UPDATE abonnes SET nom=?, prenom=?, email=?, telephone=?, date_naissance=?, date_inscription=? WHERE id_abonne=?',
        [nom, prenom, email, telephone, date_naissance, date_inscription, req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send('Abonné mis à jour');
        }
    );
});
app.delete('/abonnes/:id', (req, res) => {
    db.query('DELETE FROM abonnes WHERE id_abonne=?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Abonné supprimé');
    });
});

// --- COACHS ---
app.get('/coachs', (req, res) => {
    db.query('SELECT * FROM coachs', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});
app.get('/coachs/:id', (req, res) => {
    db.query('SELECT * FROM coachs WHERE id_coach = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});
app.post('/coachs', (req, res) => {
    const { nom, prenom, specialite, email, telephone } = req.body;
    if (!nom || !prenom || !email) {
        return res.status(400).send('Champs obligatoires manquants pour coach');
    }
    db.query(
        'INSERT INTO coachs (nom, prenom, specialite, email, telephone) VALUES (?, ?, ?, ?, ?)',
        [nom, prenom, specialite, email, telephone],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, nom, prenom, specialite, email, telephone });
        }
    );
});
app.put('/coachs/:id', (req, res) => {
    const { nom, prenom, specialite, email, telephone } = req.body;
    db.query(
        'UPDATE coachs SET nom=?, prenom=?, specialite=?, email=?, telephone=? WHERE id_coach=?',
        [nom, prenom, specialite, email, telephone, req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send('Coach mis à jour');
        }
    );
});
app.delete('/coachs/:id', (req, res) => {
    db.query('DELETE FROM coachs WHERE id_coach=?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Coach supprimé');
    });
});

// --- COURS ---
app.get('/cours', (req, res) => {
    db.query('SELECT * FROM cours', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});
app.get('/cours/:id', (req, res) => {
    db.query('SELECT * FROM cours WHERE id_cours = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});
app.post('/cours', (req, res) => {
    const { nom_cours, description, jour_semaine, heure, duree_minutes, id_coach } = req.body;
    // Validation des champs obligatoires pour cours
    if (!nom_cours || !jour_semaine || !heure || !id_coach) {
        return res.status(400).send('Champs obligatoires manquants pour cours');
    }
    db.query(
        'INSERT INTO cours (nom_cours, description, jour_semaine, heure, duree_minutes, id_coach) VALUES (?, ?, ?, ?, ?, ?)',
        [nom_cours, description, jour_semaine, heure, duree_minutes, id_coach],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, nom_cours, description, jour_semaine, heure, duree_minutes, id_coach });
        }
    );
});
app.put('/cours/:id', (req, res) => {
    const { nom_cours, description, jour_semaine, heure, duree_minutes, id_coach } = req.body;
    db.query(
        'UPDATE cours SET nom_cours=?, description=?, jour_semaine=?, heure=?, duree_minutes=?, id_coach=? WHERE id_cours=?',
        [nom_cours, description, jour_semaine, heure, duree_minutes, id_coach, req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send('Cours mis à jour');
        }
    );
});
app.delete('/cours/:id', (req, res) => {
    db.query('DELETE FROM cours WHERE id_cours=?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Cours supprimé');
    });
});

// --- PARTICIPATIONS ---
app.get('/participations', (req, res) => {
    db.query('SELECT * FROM participations', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});
app.get('/participations/:id_abonne/:id_cours/:date_participation', (req, res) => {
    const { id_abonne, id_cours, date_participation } = req.params;
    db.query(
        'SELECT * FROM participations WHERE id_abonne=? AND id_cours=? AND date_participation=?',
        [id_abonne, id_cours, date_participation],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    );
});
app.post('/participations', (req, res) => {
    const { id_abonne, id_cours, date_participation } = req.body;
    db.query(
        'INSERT INTO participations (id_abonne, id_cours, date_participation) VALUES (?, ?, ?)',
        [id_abonne, id_cours, date_participation],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send('Participation ajoutée');
        }
    );
});
app.delete('/participations/:id_abonne/:id_cours/:date_participation', (req, res) => {
    const { id_abonne, id_cours, date_participation } = req.params;
    db.query(
        'DELETE FROM participations WHERE id_abonne=? AND id_cours=? AND date_participation=?',
        [id_abonne, id_cours, date_participation],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send('Participation supprimée');
        }
    );
});

app.listen(3000, () => {
    console.log('API démarrée sur http://localhost:3000');
});

app.use((req, res) => {
    res.status(404).json({
        erreur: "Cette route n'existe pas sur l'API Sallesport.",
        info: "Consultez la documentation pour les routes disponibles : /abonnes, /coachs, /cours, /participations (GET, POST, PUT, DELETE)."
    });
});