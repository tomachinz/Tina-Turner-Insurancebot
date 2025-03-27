import fs from 'fs';
import path from 'path';
const __dirname = import.meta.dirname;

/**
 * Logs the session start time and job title
 * @param {string} jobTitle - The position being interviewed for
 * @returns {string} sessionID - The generated session ID
 */
const startSession = (carMakeModel) => {
  const sessionID = new Date().toISOString().replace(/[:.]/g, '-');
  const logFilePath = path.join(__dirname, "logs",  `${sessionID}.log`);
  console.log(`Server started session: ${sessionID} with carMakeModel: ${carMakeModel}`);

  const logData = `Session started.  ${sessionID}`;
  fs.writeFileSync(logFilePath, logData);
  return sessionID;
};

export default startSession;

