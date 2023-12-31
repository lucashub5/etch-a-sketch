document.addEventListener('DOMContentLoaded', function() {
    const barDisplay = document.getElementById('bar');
    const valueDisplay = document.getElementById('valor');
    const gridContainer = document.querySelector('.grid-container');

    let totalUnit = barDisplay.value * barDisplay.value;
    let widthValue = window.getComputedStyle(gridContainer).width;
    let newDiv = document.createElement('div');

    let isDrawing = false;

    let selectorTool = 0;

    const buttons = document.querySelectorAll('.tools-container button');
    const drawButton = document.querySelector('.draw-button');
    const eraseButton = document.querySelector('.erase-button');

    const colorSelect = document.getElementById("color-select");

    let colorPick = colorSelect.value;

    getGridValue();
    getGrid();

    barDisplay.addEventListener('input', function() {
        getGridValue();
    });

    barDisplay.addEventListener('mouseup', function() {
        getGrid();
    });

    barDisplay.addEventListener('touchend', function() {
        getGrid();
    });

    document.addEventListener('mousedown', function(event) {

        if (gridContainer.contains(event.target)) {
            isDrawing = true;
        }
    });

    document.addEventListener('touchstart', function(event) {

        if (gridContainer.contains(event.target)) {
            isDrawing = true;
        }
    });

    document.addEventListener('mouseup', function() {
        isDrawing = false;
    });

    document.addEventListener('touchend', function() {
        isDrawing = false;
    });


    function getGridValue() {
        valueDisplay.textContent = barDisplay.value + "x" + barDisplay.value;
        gridContainer.innerHTML = '';
        totalUnit = barDisplay.value * barDisplay.value;
        widthValue = window.getComputedStyle(gridContainer).width;
        divSize = parseInt(widthValue) / barDisplay.value;
    }

    function getGrid() {
        for (var i = 0; i < totalUnit; i++) {
            newDiv = document.createElement('div');
            newDiv.classList.add('unit');
            newDiv.style.width = divSize + 'px';
            newDiv.style.height = divSize + 'px';

            newDiv.addEventListener('mousedown', function(event) {
                    drawUnit(event);
            });      
            
            newDiv.addEventListener('touchstart', function(event) {
                drawUnit(event);
            }); 
            
            newDiv.addEventListener('mouseover', function(event) {
                if (isDrawing) {
                    drawUnit(event);
                }
            });

            newDiv.addEventListener('touchmove', function(event) {
                if (isDrawing) {
                    drawUnit(event);
                }
            });
        
            gridContainer.appendChild(newDiv);

        }
    }

    function drawUnit(event) {
        console.log('drawUnit triggered. SelectorTool:', selectorTool, 'ColorPick:', colorPick);
    
        if (selectorTool == 1) {
            console.log('Drawing with color:', colorPick);
            event.target.style.backgroundColor = colorPick;
        } else if (selectorTool == 2) {
            console.log('Erasing');
            event.target.style.backgroundColor = 'transparent';
        }
    }
    


    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            activeButton(this);
        });
    });
    
    function activeButton(activeButton) {
        buttons.forEach(function(button) {
            button.classList.remove('active');
        });
    
        activeButton.classList.add('active');
    }

    drawButton.addEventListener('click', function() {
        selectorTool = 1;
    });

    eraseButton.addEventListener('click', function() {
        selectorTool = 2;
    });

    colorSelect.addEventListener("change", function() {
        colorPick = colorSelect.value;
    });

});
