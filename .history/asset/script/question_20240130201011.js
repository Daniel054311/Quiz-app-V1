var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("./data.json")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching data1:", error_1.message);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
fetchData();
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    function displayCurrentQuestion() {
        // Clear the current content in the questionListContainer
        questionListContainer_1.innerHTML = "";
        var currentQuestion = questions_1[currentQuestionIndex_1];
        // Create list item element
        var listItem = document.createElement("div");
        listItem.classList.add("list-item"); // Optional: Add a class to the list item for styling
        // Create a container for the left side (question)
        var leftContainer = document.createElement("div");
        leftContainer.classList.add("left-container");
        // Create elements for left container
        var questionNumber = document.createElement("p");
        questionNumber.classList.add("question");
        questionNumber.textContent = "Question ".concat(currentQuestionIndex_1 + 1, " of ").concat(totalQuestions_1);
        var questionText = document.createElement("h1");
        questionText.innerHTML = currentQuestion.question;
        // Append elements to the left container
        leftContainer.appendChild(questionNumber);
        leftContainer.appendChild(questionText);
        // Append the left container to the list item
        listItem.appendChild(leftContainer);
        // Create a container for the right side (options and "Submit" button)
        var rightContainer = document.createElement("div");
        rightContainer.classList.add("right-container");
        // Create elements for right container
        var optionsList = document.createElement("ul");
        optionsList.classList.add("options-list");
        currentQuestion.options.forEach(function (option, index) {
            var listItem = document.createElement("li");
            listItem.textContent = "".concat(String.fromCharCode(65 + index), ": ").concat(option);
            // Add a click event listener to each option
            listItem.addEventListener("click", function () {
                // Check if the option is already marked
                if (!listItem.classList.contains("marked")) {
                    markOption(listItem, option === currentQuestion.answer);
                }
            });
            optionsList.appendChild(listItem);
        });
        // Append options list to the right container
        rightContainer.appendChild(optionsList);
        // Add "Submit" button
        var submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.addEventListener("click", function () {
            var markedOption = optionsList.querySelector(".marked");
            if (!markedOption) {
                // Show an alert if no option is selected
                alert("Please select an option before submitting.");
                return; // Stop further execution
            }
            markAnswer(optionsList, currentQuestion.answer);
            // Change border color based on correctness
            if (markedOption.classList.contains("correct")) {
                markedOption.style.border = '2px solid green'; // Green border for correct answer
            }
            else {
                markedOption.style.border = '2px solid red'; // Red border for incorrect answer
            }
            showNextButton();
        });
        // Append the "Submit" button to the right container
        rightContainer.appendChild(submitButton);
        // Add "Next" button (initially hidden)
        var nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.style.display = "none";
        nextButton.addEventListener("click", function () {
            currentQuestionIndex_1++;
            if (currentQuestionIndex_1 < totalQuestions_1) {
                displayCurrentQuestion();
            }
            else {
                // Handle end of questions, e.g., show total score
                questionListContainer_1.innerHTML = "<p>All questions answered. Your total score is ".concat(totalScore_1, " out of ").concat(totalQuestions_1, ".</p>");
            }
        });
        // Append the "Next" button to the right container
        rightContainer.appendChild(nextButton);
        // Append the right container to the list item
        listItem.appendChild(rightContainer);
        // Append the list item to the main container
        questionListContainer_1.appendChild(listItem);
    }
    // Function to flatten nested questions array
    function getFlattenedQuestions(data) {
        return data.reduce(function (acc, curr) { return acc.concat(curr.questions); }, []);
    }
    // Function to mark an option with a border color
    function markOption(optionElement, isCorrect) {
        if (isCorrect) {
            optionElement.style.border = '2px solid green'; // Mark correct answer with green border
            optionElement.classList.add('marked');
            // Optionally, you can show feedback based on correctness here
            // Update total score for correct answers only
            totalScore_1++;
        }
        else {
            optionElement.style.border = '2px solid red'; // Mark incorrect answer with red border
            optionElement.classList.add('marked');
            // Optionally, you can show feedback based on correctness here
        }
    }
    // Function to mark the correct answer after submitting
    function markAnswer(optionsList, correctAnswer) {
        Array.from(optionsList.children).forEach(function (optionElement) {
            if (optionElement instanceof HTMLElement) {
                var optionText = optionElement.textContent || "";
                var option = optionText.split(":")[1].trim();
                if (option === correctAnswer) {
                    markOption(optionElement, true);
                }
            }
        });
    }
    // Function to show the "Next" button
    function showNextButton() {
        var nextButton = document.querySelector(".right-container button:last-child");
        if (nextButton) {
            nextButton.style.display = "inline-block";
        }
    }
    var currentUrl, urlParams, typeParam_1, headTitle, headImg, data, filteredData, questionListContainer_1, totalScore_1, questions_1, totalQuestions_1, currentQuestionIndex_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentUrl = window.location.href;
                urlParams = new URLSearchParams(new URL(currentUrl).search);
                typeParam_1 = urlParams.get("type");
                headTitle = document.getElementById("title");
                headImg = document.getElementById("head_img");
                headTitle.textContent = typeParam_1;
                return [4 /*yield*/, fetchData()];
            case 1:
                data = _a.sent();
                filteredData = data.quizzes.filter(function (item) { return item.title === typeParam_1; });
                questionListContainer_1 = document.getElementById("question-list");
                totalScore_1 = 0;
                // Check if the container element exists
                if (questionListContainer_1) {
                    questions_1 = getFlattenedQuestions(filteredData);
                    totalQuestions_1 = questions_1.length;
                    currentQuestionIndex_1 = 0;
                    // Initial display
                    displayCurrentQuestion();
                }
                else {
                    console.error('Container element with id "question-list" not found.');
                }
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
