const ANY_COUNT = '*';
const ANY_SYMBOL = '.';

const STATE_FAILED = Symbol('Failed');
const STATE_SUCCEED = Symbol('Succeed');

function last(array) {
    return array[array.length - 1];
}

export class StateMachine {

    constructor(regexp) {
        this.steps = [];
        this.nullStep = new NullStep();

        let letters = regexp.split(''),
            /**
             * WildStep is the step for (c*) group. We are treating them in a special way
             * because these steps are subjects to fallback
             */
            lastWildStep = this.nullStep;

        for (let i = 0; i < letters.length; ++i) {
            let currentSymbol = letters[i],
                nextSymbol = letters[i + 1];

            if (nextSymbol === ANY_COUNT) {
                // skip the asterisk
                ++i;
                // (a*a*) is equal to (a*)
                if (lastWildStep !== last(this.steps) || currentSymbol !== lastWildStep.symbol) {
                    lastWildStep = new WildStep(currentSymbol, this.steps.length, lastWildStep);
                    this.steps.push(lastWildStep);
                }
            } else {
                this.steps.push(new Step(currentSymbol, this.steps.length));
            }
        }

        this.steps.push(new FinalStep());
    }

    match(string) {
        this.cursor = 0;
        this.string = string;
        this.length = string.length;
        this.lastWildStep = this.nullStep;
        this.status = undefined;
        this.currentStep = this.steps[0];

        while (!this.status) {
            // switch machine state unless it becomes one of final states (failed || succeed)
            this.currentStep.match(this);
        }

        this.lastWildStep.reset();

        return this.status === STATE_SUCCEED;
    }

    /**
     * Move forward to the next step
     */
    forward() {
        this.currentStep = this.steps[this.currentStep.index + 1];
    }

    /**
     * Move backward to the changeable step. In other words move to
     * the last WildStep and try to increment its match count, which
     * could lead a string to match a pattern
     */
    backward() {
        // increment the internal state of a last wild step
        this.lastWildStep.inc(this);
        // and try to match again
        this.currentStep = this.lastWildStep;
    }

}

class NullStep {

    inc() {
    }

    /**
     * Calling this method means there is no possible match (regardless of WildSteps internal state)
     * If so, there is no match
     */
    match(state) {
        state.status = STATE_FAILED;
    }

    reset() {
    }

}

class FinalStep {

    match(state) {
        if (state.cursor === state.length) {
            // if there are no more symbols to match then it is a success
            state.status = STATE_SUCCEED;
        } else {
            // otherwise move backward to try other WildSteps internal state combinations
            state.backward();
        }
    }

}

class Step {

    constructor(symbol, index) {
        this.counter = 1;
        this.symbol = symbol;
        this.index = index;
    }

    matches(symbols) {
        return this.symbol === ANY_SYMBOL
            ? symbols.length === this.counter
            : symbols === this.symbol.repeat(this.counter);
    }

    match(state) {
        let symbol = state.string.slice(state.cursor, state.cursor + this.counter);

        if (this.matches(symbol)) {
            state.cursor += this.counter;
            state.forward();
        } else {
            state.backward();
        }
    }

}

class WildStep extends Step {

    constructor(symbol, index, previousWildStep) {
        super(symbol, index);
        // a .counter is an internal state variable which defines
        // how match symbols a step should match
        this.counter = 0;
        this.previousWildStep = previousWildStep;
    }

    reset() {
        this.counter = 0;
        this.previousWildStep.reset();
    }

    match(state) {
        let symbols = state.string.slice(state.cursor, state.cursor + this.counter);

        if (this.matches(symbols)) {
            this.lastCursor = state.cursor;
            state.lastWildStep = this;
            state.cursor += this.counter;

            state.forward();
        } else {
            this.counter = 0;
            state.lastWildStep = this.previousWildStep;
            state.backward();
        }
    }

    inc(state) {
        // move the state machine cursor to the last saved position
        // while matching a current step
        state.cursor = this.lastCursor;
        this.counter++;
    }

}

