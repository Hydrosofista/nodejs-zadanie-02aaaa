const fs = require("fs");
const path = require("path");

function saveData(jsonPath, outputDir, overwrite = false) {
  // Wczytaj dane z pliku JSON
  let usersData;
  try {
    const data = fs.readFileSync(jsonPath, "utf8");
    usersData = JSON.parse(data);
  } catch (error) {
    console.error("Error reading the JSON file:", error.message);
    return;
  }

  // Sprawdź, czy folder outputDir istnieje
  if (fs.existsSync(outputDir)) {
    if (!overwrite) {
      console.log(
        `Folder "${outputDir}" already exists. Use overwrite option to replace existing files.`
      );
      return;
    }
  } else {
    // Jeśli folder nie istnieje, utwórz go
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Iteracja przez użytkowników i zapisywanie danych do plików
  usersData.forEach((user) => {
    const fileName = `${user.id}-${user.name.replace(/\s+/g, "")}-${
      user.username
    }.txt`;
    const filePath = path.join(outputDir, fileName);

    const fileContent = `Name: ${user.name}\nSurname: ${user.username}\nStreet: ${user.address.street}\nZip Code: ${user.address.zipcode}\nCity: ${user.address.city}\nPhone: ${user.phone}`;

    fs.writeFileSync(filePath, fileContent, "utf8");
    console.log(`File saved: ${filePath}`);
  });
}

// Przykładowe wywołanie funkcji saveData
const jsonFilePath = path.join(__dirname, "data", "users.json");
const outputFolder = path.join(__dirname, "output");

saveData(jsonFilePath, outputFolder, true);
