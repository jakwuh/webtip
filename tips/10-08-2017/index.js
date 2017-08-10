function asyncOperation() {
    setTimeout(() => {
        performance.mark('async-done');
        performance.measure('time-to-async', 'async-start', 'async-done');
    }, 1000);
}

performance.mark('async-start');
asyncOperation();
