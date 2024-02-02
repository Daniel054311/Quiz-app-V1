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
// Function to make a Fetch API call for Interface 1
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
// Function to render quizzes
function renderQuizzes(data, isDarkMode) {
    // Get the container where you want to display the options
    var optionsContainer = document.getElementById("navigation");
    // Check if the container exists
    if (optionsContainer) {
        // Clear existing content
        optionsContainer.innerHTML = "";
        // Iterate over the options and append them to the container
        data.quizzes.forEach(function (option) {
            var listItem = document.createElement("li");
            listItem.className = "list-item";
            // Apply background color based on isDarkMode
            listItem.style.backgroundColor = isDarkMode ? "#3b4c66" : "white";
            listItem.style.color = isDarkMode ? "#fff" : "#313e51";
            var darkModeSun = document.getElementById("darkModeSun");
            var darkModeMoon = document.getElementById("darkModeMoon");
            // Update dark mode icons
            darkModeSun.src = isDarkMode ? "/images/icon-sun-light.svg" : "/images/icon-sun-dark.svg";
            darkModeMoon.src = isDarkMode ? "/images/icon-moon-light.svg" : "/images/icon-moon-dark.svg";
            // Create the elements for option letter and content
            var title = document.createElement("h1");
            title.className = "content";
            title.textContent = option.title;
            var img = document.createElement("img");
            img.className = "image";
            img.src = option.icon;
            img.style.backgroundColor = option.color;
            // Append elements to the list item
            listItem.appendChild(img);
            listItem.appendChild(title);
            // Add click event listener to the title
            listItem.addEventListener("click", function () {
                window.location.href = "/question.html?type=" + option.title;
            });
            // Append the list item to the options container
            optionsContainer.appendChild(listItem);
        });
    }
}
// Document ready event listener
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var data_1, isDarkMode_1, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetchData()];
            case 1:
                data_1 = _b.sent();
                isDarkMode_1 = false;
                // Render quizzes with isDarkMode initially set to false
                renderQuizzes(data_1, isDarkMode_1);
                // Dark mode toggle
                (_a = document.getElementById("darkModeToggle")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                    // Toggle the dark mode status
                    isDarkMode_1 = !isDarkMode_1;
                    // Set background color and image based on dark mode status
                    document.body.style.backgroundColor = isDarkMode_1 ? "#313E51" : "#F4F6FA";
                    document.body.style.backgroundImage = isDarkMode_1 ? 'url("/images/pattern-background-desktop-dark.svg")' : 'url("/images/pattern-background-desktop-light.svg")';
                    // Optionally, adjust text color based on dark mode status
                    document.body.style.color = isDarkMode_1 ? "#ffffff" : "#313e51";
                    // Render quizzes with updated isDarkMode status
                    renderQuizzes(data_1, isDarkMode_1);
                });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _b.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
