let display = document.getElementById('display');
        let currentInput = '0';
        let previousInput = null;
        let operator = null;
        let waitingForOperand = false;
        let justCalculated = false;

        function updateDisplay() {
            // Format large numbers
            let displayValue = currentInput;
            if (displayValue.length > 9) {
                displayValue = parseFloat(displayValue).toExponential(3);
            }
            display.textContent = displayValue;
        }

        function inputNumber(num) {
            if (waitingForOperand || justCalculated) {
                currentInput = num;
                waitingForOperand = false;
                justCalculated = false;
            } else {
                if (num === '.' && currentInput.includes('.')) return;
                currentInput = currentInput === '0' ? num : currentInput + num;
            }
            
            clearOperatorHighlight();
            updateDisplay();
        }

        function inputOperator(nextOperator) {
            const inputValue = parseFloat(currentInput);

            if (previousInput === null) {
                previousInput = inputValue;
            } else if (operator && !waitingForOperand) {
                const currentValue = previousInput || 0;
                const newValue = performCalculation(currentValue, inputValue, operator);

                currentInput = `${parseFloat(newValue.toFixed(7))}`;
                previousInput = newValue;
            }

            waitingForOperand = true;
            operator = nextOperator;
            justCalculated = false;
            
            highlightOperator(nextOperator);
            updateDisplay();
        }

        function performCalculation(firstOperand, secondOperand, operator) {
            switch (operator) {
                case '+':
                    return firstOperand + secondOperand;
                case '-':
                    return firstOperand - secondOperand;
                case '*':
                    return firstOperand * secondOperand;
                case '/':
                    return secondOperand !== 0 ? firstOperand / secondOperand : 0;
                case '%':
                    return firstOperand % secondOperand;
                default:
                    return secondOperand;
            }
        }

        function calculate() {
            const inputValue = parseFloat(currentInput);

            if (previousInput !== null && operator && !waitingForOperand) {
                const newValue = performCalculation(previousInput, inputValue, operator);
                
                currentInput = `${parseFloat(newValue.toFixed(7))}`;
                previousInput = null;
                operator = null;
                waitingForOperand = true;
                justCalculated = true;
            }
            
            clearOperatorHighlight();
            updateDisplay();
        }

        function clearAll() {
            currentInput = '0';
            previousInput = null;
            operator = null;
            waitingForOperand = false;
            justCalculated = false;
            clearOperatorHighlight();
            updateDisplay();
        }

        function toggleSign() {
            if (currentInput !== '0') {
                currentInput = currentInput.charAt(0) === '-' 
                    ? currentInput.slice(1) 
                    : '-' + currentInput;
                updateDisplay();
            }
        }

        function highlightOperator(op) {
            clearOperatorHighlight();
            
            let buttonId;
            switch(op) {
                case '+': buttonId = 'add'; break;
                case '-': buttonId = 'subtract'; break;
                case '*': buttonId = 'multiply'; break;
                case '/': buttonId = 'divide'; break;
            }
            
            if (buttonId) {
                document.getElementById(buttonId).classList.add('active');
            }
        }

        function clearOperatorHighlight() {
            const operators = ['add', 'subtract', 'multiply', 'divide'];
            operators.forEach(id => {
                document.getElementById(id).classList.remove('active');
            });
        }

        function highlightOperator(op) {
            clearOperatorHighlight();
            
            let buttonId;
            switch(op) {
                case '+': buttonId = 'add'; break;
                case '-': buttonId = 'subtract'; break;
                case '*': buttonId = 'multiply'; break;
                case '/': buttonId = 'divide'; break;
            }
            
            if (buttonId) {
                document.getElementById(buttonId).classList.add('active');
            }
        }

        function clearOperatorHighlight() {
            const operators = ['add', 'subtract', 'multiply', 'divide'];
            operators.forEach(id => {
                document.getElementById(id).classList.remove('active');
            });
        }

        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9' || key === '.') {
                inputNumber(key);
            } else if (key === '+' || key === '-') {
                inputOperator(key);
            } else if (key === '*') {
                inputOperator('*');
            } else if (key === '/') {
                event.preventDefault();
                inputOperator('/');
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearAll();
            } else if (key === '%') {
                inputOperator('%');
            }
            });