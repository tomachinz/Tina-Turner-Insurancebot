export const generateBasePrompt = (carMakeModel, messageHistory) => {
  if (typeof carMakeModel == "boolean") {
    return {
      error: `The provided input carMakeModel ${carMakeModel} is a boolean, but should be a string.`,
    };
  }

  if (typeof messageHistory == "boolean") {
    return {
      error: `The provided input messageHistory ${messageHistory} is a boolean, but should be an array.`,
    };
  }

  if (typeof carMakeModel == "number") {
    return {
      error: `The provided input carMakeModel ${carMakeModel} is a number, but should be a string.`,
    };
  }

  if (typeof messageHistory == "number") {
    return {
      error: `The provided input messageHistory ${messageHistory} is a number, but should be an array.`,
    };
  }

  if (!carMakeModel || typeof carMakeModel !== "string") {
    return {
      error: `The provided input carMakeModel is invalid, but should be a non-empty string.`,
    };
  }

  if (!Array.isArray(messageHistory) || messageHistory.length === 0) {
    return {
      error: `The provided input messageHistory is invalid, but should be a non-empty array.`,
    };
  }

  return `You are Tina, a chat agent inside a web app that chats with a potential car insurance customer and recommends the most suitable insurance policy based on the attributes of the users. Tina will recommend one of either Mechanical Breakdown Insurance (MBI), Comprehensive Car Insurance, or Third Party Car Insurance, and provide reasons to support the recommendation, paying attention to the business rules: 1) MBI is not available to trucks and racing cars, 2) Comprehensive Car Insurance is only available to any motor vehicles less than 10 years old.
          The user has said their vehicle type is: ${carMakeModel}.
          The user's}'s previous responses are:
          ${messageHistory
            .map((m) => `${m.role}: ${m.parts[0].text}`)
            .join("\n")}`;
};

export const generateEvaluationPrompt = (basePrompt) => {
  if (typeof basePrompt == "boolean") {
    return {
      error: `The provided input basePrompt ${basePrompt} is a boolean, but should be a string.`,
    };
  }

  if (typeof basePrompt == "number") {
    return {
      error: `The provided input basePrompt ${basePrompt} is a number, but should be a string.`,
    };
  }

  if (!basePrompt || typeof basePrompt !== "string") {
    return {
      error: `The provided input basePrompt is invalid, but should be a non-empty string.`,
    };
  }

  return `${basePrompt}
  Establish the car make model and year, and how many years driving experience the user has. 
If this is not known ask the user. Consider that Mechanical Breakdown Insurance is not available to trucks and racing cars, and that Comprehensive Car Insurance is only available to any motor vehicles less than 10 years old, suggest a one of the three types of insurance to the user.
  `;
};

export const generateQuestionPrompt = (basePrompt, userMessage) => {
  if (typeof basePrompt == "boolean") {
    return {
      error: `The provided input basePrompt ${basePrompt} is a boolean, but should be a string.`,
    };
  }

  if (typeof userMessage == "boolean") {
    return {
      error: `The provided input userMessage ${userMessage} is a boolean, but should be a string.`,
    };
  }

  if (typeof basePrompt == "number") {
    return {
      error: `The provided input basePrompt ${basePrompt} is a number, but should be a string.`,
    };
  }

  if (typeof userMessage == "number") {
    return {
      error: `The provided input userMessage ${userMessage} is a number, but should be a string.`,
    };
  }

  if (!basePrompt || typeof basePrompt !== "string") {
    return {
      error: `The provided input basePrompt is invalid, but should be a non-empty string.`,
    };
  }

  if (!userMessage || typeof userMessage !== "string") {
    return {
      error: `The provided input userMessage is invalid, but should be a non-empty string.`,
    };
  }

  return `${basePrompt}
          The insurance customer just said: "${userMessage}".
          What is your next question for the candidate?
         `;
};
