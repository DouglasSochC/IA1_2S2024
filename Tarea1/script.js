// MIT License

function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states) {
    // Aleatoriamente ensuciar una habitación
    if (Math.random() < 0.3) {  // 30% de probabilidad de ensuciar
        var dirtyLocation = Math.random() < 0.5 ? 1 : 2;  // 50% A, 50% B
        states[dirtyLocation] = "DIRTY";
        document.getElementById("log").innerHTML += "<br>¡Se ensució la habitación " + (dirtyLocation === 1 ? "A" : "B") + "!";
    }

    var checkStates = states[3];
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);

    let check = `A: ${states[1]} - B: ${states[2]} - Location: ${states[0]} - Action: ${action_result}`;
    if (!checkStates.includes(check)) {
        checkStates.push(check);
    }

    var currentState = "A: " + states[1] + " | B: " + states[2] + " | Location: " + states[0] + " | Action: " + action_result;
    document.getElementById("log").innerHTML += "<br>".concat(currentState);
    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";
    const timeoutId = setTimeout(function () { test(states); }, 1000);
    if (checkStates.length == 8) {
        document.getElementById("log").innerHTML += "<br>¡Se han visitado todos los estados!";
        // Se imprimen los estados obtenidos
        document.getElementById("log").innerHTML += "<br>Estados obtenidos: ";
        for (let i = 0; i < checkStates.length; i++) {
            document.getElementById("log").innerHTML += "<br>".concat(checkStates[i]);
        }
        clearTimeout(timeoutId);
    }
}

var states = ["A", "DIRTY", "DIRTY", []];
test(states);