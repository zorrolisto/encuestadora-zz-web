const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database(
  "./encuestadora.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to the in-memory SQlite database.");
  }
);

const init = async () => {
  const salt = await bcrypt.genSalt(10);
  const users = [
    {
      name: "Julio Cabanillas",
      email: "julio@mail.com",
      rol: "Admin",
      sex: 1,
      password: await bcrypt.hash("hola", salt),
    },
    {
      name: "Daisy Rojas",
      email: "daisy@mail.com",
      rol: "Censador",
      sex: 0,
      password: await bcrypt.hash("hola", salt),
    },
    {
      name: "Cristian Dominguez",
      email: "cristian@mail.com",
      rol: "Censador",
      sex: 1,
      password: await bcrypt.hash("hola", salt),
    },
  ];
  const registros = [
    {
      address: "Ginebra 989",
      nroPersonas: 3,
      income: 1000,
      nroMenores: 1,
      aguaPotable: true,
      luz: false,
      fechaTomada: "2021-05-01",
      censadorId: 2,
    },
    {
      address: "Whisky 300",
      nroPersonas: 6,
      income: 2000,
      nroMenores: 3,
      aguaPotable: false,
      luz: true,
      fechaTomada: "2021-05-01",
      censadorId: 3,
    },
  ];
  const campañas = [{ casasPorCensador: 500, fechaLimite: "2024-05-05" }];
  const avancesCampaña = [
    {
      campañaId: 1,
      censadorId: 3,
      registrosSubidos: 1,
      ultimaFechaDeSubida: "2024-01-28",
    },
    {
      campañaId: 1,
      censadorId: 2,
      registrosSubidos: 50,
      ultimaFechaDeSubida: "2024-01-30",
    },
  ];

  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS user`, (err) => {
      if (err) return console.error(err.message);
      console.log("Deleted user table");
      db.run(
        `CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, name TEXT, email TEXT, rol TEXT, sex BIT, password TEXT)`,
        (err) => {
          if (err) return console.error(err.message);
          console.log("Created user table");
          const insertSql = `INSERT INTO user (name, email, rol, sex, password) VALUES (?, ?, ?, ?, ?)`;
          users.forEach((u) => {
            const values = Object.values(u);
            db.run(insertSql, values, (e) => {
              if (e) return console.error(e.message);
              console.log(`Added user`);
            });
          });
        }
      );
    });
    db.run(`DROP TABLE IF EXISTS registro`, (err) => {
      if (err) return console.error(err.message);
      console.log("Deleted registro table");
      db.run(
        `CREATE TABLE IF NOT EXISTS registro (id INTEGER PRIMARY KEY, address TEXT, nroPersonas INTEGER, income INTEGER, nroMenores INTEGER, aguaPotable BIT, luz BIT, fechaTomada DATETIME, fechaSubida DATETIME DEFAULT CURRENT_TIMESTAMP, censadorId INTEGER)`,
        (err) => {
          if (err) return console.error(err.message);
          console.log("Created registro table");
          const insertSql = `INSERT INTO registro (address, nroPersonas, income, nroMenores, aguaPotable, luz, fechaTomada, censadorId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
          registros.forEach((r) => {
            const values = Object.values(r);
            db.run(insertSql, values, (e) => {
              if (e) return console.error(e.message);
              console.log(`Added registro`);
            });
          });
        }
      );
    });
    db.run(`DROP TABLE IF EXISTS campaña`, (err) => {
      if (err) return console.error(err.message);
      console.log("Deleted campaña table");
      db.run(
        `CREATE TABLE IF NOT EXISTS campaña (id INTEGER PRIMARY KEY, casasPorCensador INTEGER, fechaLimite DATETIME, fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP)`,
        (err) => {
          if (err) return console.error(err.message);
          console.log("Created campaña table");
          const insertSql = `INSERT INTO campaña (casasPorCensador, fechaLimite) VALUES (?, ?)`;
          campañas.forEach((c) => {
            const values = Object.values(c);
            db.run(insertSql, values, (e) => {
              if (e) return console.error(e.message);
              console.log(`Added campaña`);
            });
          });
        }
      );
    });
    db.run(`DROP TABLE IF EXISTS avancescampaña`, (err) => {
      if (err) return console.error(err.message);
      console.log("Deleted avancescampaña table");
      db.run(
        `CREATE TABLE IF NOT EXISTS avancescampaña (id INTEGER PRIMARY KEY, campañaId INTEGER, censadorId INTEGER, registrosSubidos INTEGER, ultimaFechaDeSubida DATETIME)`,
        (err) => {
          if (err) return console.error(err.message);
          console.log("Created avancescampaña table");
          const insertSql = `INSERT INTO avancescampaña (campañaId, censadorId, registrosSubidos, ultimaFechaDeSubida) VALUES (?, ?, ?, ?)`;
          avancesCampaña.forEach((c) => {
            const values = Object.values(c);
            db.run(insertSql, values, (e) => {
              if (e) return console.error(e.message);
              console.log(`Added avancescampaña`);
            });
          });
        }
      );
    });
  });
};

init();
