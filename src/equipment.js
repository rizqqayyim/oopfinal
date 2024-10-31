window.onload = function() {
    displayActivity();
}

function addEquipment(activityIndex) {
    var equipmentName = document.getElementById(`equipmentInput-${activityIndex}`).value;
    if (equipmentName === '') {
        alert('Please enter the equipment name!');
        return;
    }

    var activities = JSON.parse(localStorage.getItem('activities'));
    activities[activityIndex].equipmentList.push(equipmentName);
    localStorage.setItem('activities', JSON.stringify(activities));
    document.getElementById(`equipmentInput-${activityIndex}`).value = '';
    displayActivity();
}

function editActivity(activityIndex) {
    var activities = JSON.parse(localStorage.getItem('activities'));
    var newActivityName = prompt("Create New Activity Name..", activities[activityIndex].name);
    if (newActivityName) {
        activities[activityIndex].name = newActivityName;
        localStorage.setItem('activities', JSON.stringify(activities));
        displayActivity();
    }
}

function deleteActivity(activityIndex) {
    var activities = JSON.parse(localStorage.getItem('activities'));
    activities.splice(activityIndex, 1);
    localStorage.setItem('activities', JSON.stringify(activities));
    displayActivity();
}

function editEquipment(activityIndex, equipmentIndex) {
    var activities = JSON.parse(localStorage.getItem('activities'));
    var newEquipmentName = prompt("Edit Equipment Name:", activities[activityIndex].equipmentList[equipmentIndex]);
    if (newEquipmentName) {
        activities[activityIndex].equipmentList[equipmentIndex] = newEquipmentName;
        localStorage.setItem('activities', JSON.stringify(activities));
        displayActivity();
    }
}

function deleteEquipment(activityIndex, equipmentIndex) {
    var activities = JSON.parse(localStorage.getItem('activities'));
    activities[activityIndex].equipmentList.splice(equipmentIndex, 1);
    localStorage.setItem('activities', JSON.stringify(activities));
    displayActivity();
}

function displayActivity() {
    var activitiesOutput = document.getElementById('activitiesOutput');
    activitiesOutput.innerHTML = '';
    var activities = JSON.parse(localStorage.getItem('activities')) || [];

    const storedActivities = JSON.parse(localStorage.getItem("selectedActivities")) || [];

    storedActivities.forEach((activity, index) => {
        if (typeof activity === "string") {
            activity = { name: activity, equipmentList: [] };
            storedActivities[index] = activity;
        }

        const activityBox = document.createElement('div');
        activityBox.className = 'activity-box';

        const activityHeaderContainer = document.createElement('div');
        activityHeaderContainer.className = 'activity-header-container';
        activityHeaderContainer.style.display = 'flex';
        activityHeaderContainer.style.justifyContent = 'space-between';
        activityHeaderContainer.style.alignItems = 'center';

        const activityHeader = document.createElement('h4');
        activityHeader.className = 'activity-header';
        activityHeader.innerText = activity.name;

        const activityButtons = document.createElement('div');
        activityButtons.className = 'activity-buttons';

        const editActivityButton = document.createElement('button');
        editActivityButton.innerText = 'Edit Activity';
        editActivityButton.onclick = function() {
            let newActivityName = prompt("Edit Activity Name:", activity.name);
            if (newActivityName) {
                storedActivities[index].name = newActivityName;
                localStorage.setItem("selectedActivities", JSON.stringify(storedActivities));
                displayActivity();
            }
        };
        activityButtons.appendChild(editActivityButton);

        const deleteActivityButton = document.createElement('button');
        deleteActivityButton.innerText = 'Delete Activity';
        deleteActivityButton.onclick = function() {
            storedActivities.splice(index, 1);
            localStorage.setItem("selectedActivities", JSON.stringify(storedActivities));
            displayActivity();
        };
        activityButtons.appendChild(deleteActivityButton);

        activityHeaderContainer.appendChild(activityHeader);
        activityHeaderContainer.appendChild(activityButtons);
        activityBox.appendChild(activityHeaderContainer);

        const equipmentContainer = document.createElement('div');
        equipmentContainer.className = 'equipment-container';

        const equipmentInput = document.createElement('input');
        equipmentInput.type = 'text';
        equipmentInput.placeholder = 'Enter equipment name... ';
        equipmentInput.id = `equipmentInput-selected-${index}`;
        equipmentContainer.appendChild(equipmentInput);

        const addEquipmentButton = document.createElement('button');
        addEquipmentButton.innerText = 'ADD EQUIPMENT';
        addEquipmentButton.onclick = function() {
            let equipmentName = document.getElementById(`equipmentInput-selected-${index}`).value;
            if (equipmentName === '') {
                alert('Please enter the equipment name!');
                return;
            }

            if (!storedActivities[index].equipmentList) storedActivities[index].equipmentList = [];
            storedActivities[index].equipmentList.push(equipmentName);
            localStorage.setItem("selectedActivities", JSON.stringify(storedActivities));
            document.getElementById(`equipmentInput-selected-${index}`).value = '';
            alert('Equipment has been added successfully!');
            displayActivity();
        };
        equipmentContainer.appendChild(addEquipmentButton);
        activityBox.appendChild(equipmentContainer);

        if (activity.equipmentList) {
            const equipmentList = document.createElement('div');
            equipmentList.className = 'equipment-list';
            activity.equipmentList.forEach((equipment, equipmentIndex) => {
                const checklistItem = document.createElement('div');
                checklistItem.className = 'checklist-item';
                checklistItem.style.display = 'flex';
                checklistItem.style.justifyContent = 'space-between';
                checklistItem.style.alignItems = 'center';
                checklistItem.style.marginBottom = '10px'; // Space between equipment items

                const equipmentText = document.createElement('span');
                equipmentText.innerText = equipment;
                checklistItem.appendChild(equipmentText);

                const equipmentButtons = document.createElement('div');
                equipmentButtons.className = 'activity-buttons';
                equipmentButtons.style.display = 'flex';

                const editEquipmentButton = document.createElement('button');
                editEquipmentButton.innerText = 'Edit';
                editEquipmentButton.style.marginRight = '5px';
                editEquipmentButton.onclick = function() {
                    let newEquipmentName = prompt("Edit Equipment Name:", equipment);
                    if (newEquipmentName) {
                        storedActivities[index].equipmentList[equipmentIndex] = newEquipmentName;
                        localStorage.setItem("selectedActivities", JSON.stringify(storedActivities));
                        displayActivity();
                    }
                };
                equipmentButtons.appendChild(editEquipmentButton);

                const deleteEquipmentButton = document.createElement('button');
                deleteEquipmentButton.innerText = 'Delete';
                deleteEquipmentButton.onclick = function() {
                    storedActivities[index].equipmentList.splice(equipmentIndex, 1);
                    localStorage.setItem("selectedActivities", JSON.stringify(storedActivities));
                    displayActivity();
                };
                equipmentButtons.appendChild(deleteEquipmentButton);

                checklistItem.appendChild(equipmentButtons);
                equipmentList.appendChild(checklistItem);
            });
            activityBox.appendChild(equipmentList);
        }

        activitiesOutput.appendChild(activityBox);
    });

    localStorage.setItem("selectedActivities", JSON.stringify(storedActivities));
}
