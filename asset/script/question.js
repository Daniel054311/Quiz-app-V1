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
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    function displayCurrentQuestion() {
        questionListContainer_1.innerHTML = "";
        var currentQuestion = filteredData_1[0].questions[currentQuestionIndex_1];
        var listItem = document.createElement("div");
        listItem.classList.add("list-item");
        var leftContainer = document.createElement("div");
        leftContainer.classList.add("left-container");
        var questionNumber = document.createElement("p");
        questionNumber.classList.add("question");
        questionNumber.textContent = "Question ".concat(currentQuestionIndex_1 + 1, " of ").concat(filteredData_1[0].questions.length);
        var questionText = document.createElement("h1");
        questionText.innerHTML = currentQuestion.question;
        leftContainer.appendChild(questionNumber);
        leftContainer.appendChild(questionText);
        listItem.appendChild(leftContainer);
        var optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options-container");
        // Add the missing declaration for optionsList
        var optionsList = document.createElement("ul");
        optionsList.classList.add("options-list");
        currentQuestion.options.forEach(function (option, index) {
            var listItem = document.createElement("li");
            // Create a span for the alphabet
            var alphabetSpan = document.createElement("span");
            alphabetSpan.textContent = String.fromCharCode(65 + index);
            alphabetSpan.className = "letter";
            // Set the option text content
            var optionText = document.createElement("span");
            optionText.textContent = option;
            // Append both the alphabet and option to the list item
            listItem.appendChild(alphabetSpan);
            listItem.appendChild(optionText);
            listItem.addEventListener("click", function () {
                if (!listItem.classList.contains("marked")) {
                    markOption(optionsList, listItem);
                }
            });
            optionsList.appendChild(listItem);
        });
        var submitButton = document.createElement("button");
        submitButton.className = "submit";
        submitButton.textContent = "Submit Answer";
        submitButton.addEventListener("click", function () {
            var markedOption = optionsList.querySelector(".marked");
            if (!markedOption) {
                alert("Please select an option before submitting.");
                return;
            }
            totalScore_1 += markAnswer(optionsList, currentQuestion.answer);
            // Hide the "Submit" button
            submitButton.style.display = "none";
            // Disable further clicks on options
            optionsList.querySelectorAll("li").forEach(function (option) {
                option.removeEventListener("click", optionClickHandler);
            });
            // Show the "Next" button
            nextButton.style.display = "block";
        });
        var nextButton = document.createElement("button");
        nextButton.textContent = "Next Question";
        nextButton.style.display = "none";
        nextButton.className = "nextButton";
        nextButton.addEventListener("click", function () {
            // Handle moving to the next question or finishing the quiz
            // Reset styles for the next question
            optionsList.querySelectorAll("li").forEach(function (option) {
                option.style.border = "";
                option.classList.remove("marked", "correct", "wrong");
            });
            nextButton.style.display = "none";
            // Enable click event for options
            optionsList.querySelectorAll("li").forEach(function (option) {
                option.addEventListener("click", optionClickHandler);
            });
            // Display the next question
            currentQuestionIndex_1++;
            if (currentQuestionIndex_1 < filteredData_1[0].questions.length) {
                displayCurrentQuestion();
            }
            else {
                // Handle end of questions, e.g., show total score
                questionListContainer_1.innerHTML = "<p>All questions answered. Your total score is ".concat(totalScore_1, " out of ").concat(filteredData_1[0].questions.length, ".</p>");
            }
        });
        optionsContainer.appendChild(optionsList);
        optionsContainer.appendChild(submitButton);
        optionsContainer.appendChild(nextButton);
        questionListContainer_1.appendChild(optionsContainer);
        questionListContainer_1.appendChild(listItem);
        // Event handler for option clicks
        function optionClickHandler() {
            var isAlreadyMarked = this.classList.contains("marked");
            // Only mark the option if it's not already marked
            if (!isAlreadyMarked) {
                markOption(optionsList, this);
            }
        }
        // Attach click event to options
        optionsList.querySelectorAll("li").forEach(function (option) {
            option.addEventListener("click", optionClickHandler);
        });
    }
    var currentUrl, urlParams, questionListContainer_1, typeParam_1, alphabetSpan, headTitle, header, totalScore_1, currentQuestionIndex_1, data, filteredData_1, imageUrl, headImg, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                currentUrl = window.location.href;
                urlParams = new URLSearchParams(new URL(currentUrl).search);
                questionListContainer_1 = document.getElementById("question-list");
                typeParam_1 = urlParams.get("type");
                headTitle = document.getElementById("title");
                header = document.getElementById("header");
                headTitle.textContent = typeParam_1;
                totalScore_1 = 0;
                currentQuestionIndex_1 = 0;
                if (!questionListContainer_1) return [3 /*break*/, 2];
                return [4 /*yield*/, fetchData()];
            case 1:
                data = _a.sent();
                filteredData_1 = data.quizzes.filter(function (item) { return item.title === typeParam_1; });
                if (filteredData_1.length > 0) {
                    imageUrl = filteredData_1[0].icon;
                    headImg = document.getElementById("head_img");
                    if (headImg && imageUrl) {
                        headImg.src = imageUrl;
                    }
                    else {
                        console.error('Image element with id "head_img" not found or imageUrl not available.');
                    }
                    displayCurrentQuestion();
                }
                else {
                    console.error("No quiz found with the specified type.");
                    window.location.href = '/';
                }
                return [3 /*break*/, 3];
            case 2:
                console.error('Container element with id "question-list" not found.');
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
function markOption(optionsList, optionElement) {
    // Check if any option is already marked
    var markedOption = optionsList.querySelector(".marked");
    if (markedOption || optionElement.classList.contains("marked")) {
        // Remove the "marked" class from the previously marked option
        markedOption.classList.remove("marked");
        markedOption.style.border = ""; // Clear the previous border style
        // Return without marking the current option if it's already marked
        return;
    }
    // Only change the border color to purple when an option is clicked
    optionElement.style.border = "2px solid rgba(167, 41, 245, 1)";
    // Add the "marked" class to the current option
    optionElement.classList.add("marked");
}
function markAnswer(optionsList, correctAnswer) {
    var score = 0;
    // Function to mark the correct answer after submitting
    optionsList.querySelectorAll("li").forEach(function (option, index) {
        var _a;
        var alphabetSpan = option.querySelector(".letter");
        var listItem = option;
        var crossIcon = document.createElement("span");
        crossIcon.innerHTML = '<i class="fas fa-times"></i>';
        crossIcon.className = "crossIcon";
        var tickIcon = document.createElement("span");
        tickIcon.innerHTML = '<i class="fas fa-check"></i>'; // Assuming Font Awesome is used
        tickIcon.className = "tickIcon";
        if ((_a = option.textContent) === null || _a === void 0 ? void 0 : _a.endsWith(correctAnswer)) {
            if (option.classList.contains("marked")) {
                // Mark the selected option as correct
                option.classList.add("correct");
                option.style.border = "2px solid green";
                alphabetSpan.style.backgroundColor = "green";
                alphabetSpan.style.color = "white";
                listItem.appendChild(tickIcon);
                score += 1;
            }
            else {
                // Mark the correct option
                option.classList.add("correct");
                listItem.appendChild(tickIcon);
            }
        }
        else if (option.classList.contains("marked")) {
            listItem.appendChild(crossIcon);
            // Mark the selected option as wrong
            option.style.border = "2px solid red";
            option.classList.add("wrong");
            alphabetSpan.style.backgroundColor = "red";
            alphabetSpan.style.color = "white";
        }
    });
    return score;
}
