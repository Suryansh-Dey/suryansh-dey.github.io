import career_weights from "./resources/career_weights.js"
function dot(json1, json2) {
    let sum = 0;
    let fields = Object.keys(json1);
    for (let field of fields)
        sum += json2[field] * json1[field];
    return sum;
}
export function priortise(scores) {
    let priorties = {};
    let total = 0;
    let jobs = Object.keys(career_weights);
    for (let job of jobs) {
        let tests = Object.keys(career_weights[job]);
        let priorty = 0;
        for (let test of tests)
            priorty += dot(career_weights[job][test], scores[test]);
        priorties[job] = priorty;
        total += priorty ** 2;
    }
    for (let job of jobs)
        priorties[job] = (100 * priorties[job] ** 2 / total).toFixed(2);
    return priorties;
}
export function stringify(priorties) {
    let formatted = "I gave few tests and found that:\n"
    let jobs = Object.keys(priorties)
    let mostSuitableJob = jobs[0]
    for (let job of jobs) {
        if (parseFloat(priorties[mostSuitableJob]) < parseFloat(priorties[job]))
            mostSuitableJob = job
        formatted += `I am ${priorties[job]}% suitable for ${job}, `
    }
    return formatted + `\nHence most suitable is ${mostSuitableJob}. Guide me about this career option like how should I prepare for it etc.`
}