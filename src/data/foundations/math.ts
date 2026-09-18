import type { FoundationLessonMap } from "@/data/foundations/types";

export const mathLessons: FoundationLessonMap = {
  "foundations/discrete-mathematics": {
    summary: "Use logic, sets, counting, graphs, invariants, and proof techniques to justify interview algorithms.",
    durationMinutes: 60, level: "foundation", roleIds: ["sde", "ai-engineer", "ml-engineer", "data-scientist", "security", "fintech", "quant-dev", "quant-research"], prerequisites: [],
    outcomes: ["Translate conditions into logic and sets", "Apply counting and recurrence reasoning", "Construct contradiction, induction, and invariant proofs"],
    conceptMap: ["Logic and quantifiers express claims", "Sets and functions model domains", "Counting separates arrangements from selections", "Proof extends evidence to every permitted input"],
    keyIdea: "Most algorithm explanations are short proofs: state the claim, preserve an invariant, and connect termination to the result.",
    analogy: { title: "A contract for every input", body: "Testing checks chosen examples; proof shows why no input satisfying the preconditions can escape the conclusion." },
    theory: [
      { heading: "Logic and sets", body: "P→Q is false only when P holds and Q does not; its contrapositive ¬Q→¬P is equivalent. Quantifier order matters: each x having some y does not imply one y works for every x. Set operations and functions precisely describe states and mappings." },
      { heading: "Counting", body: "The product rule counts staged choices; permutations order objects and combinations select without order. Inclusion-exclusion corrects overlap. The pigeonhole principle proves repetition when more objects occupy fewer categories." },
      { heading: "Proof methods", body: "Induction proves a base case and a step. Contradiction assumes the claim false and reaches impossibility. Loop-invariant proofs require initialization, maintenance, and termination. Paths, cycles, degree, and connectivity formalize graph reasoning." }
    ],
    example: { title: "Binary-search proof frame", language: "text", code: `Invariant: the first true position lies in [lo, hi).
Initialize: the bounds contain every possible answer.
Maintain: the midpoint test removes only impossible positions.
Terminate: lo == hi, so that boundary is the answer.`, explanation: "The same initialize-maintain-terminate structure proves many loops." },
    failureModes: ["Treating implication as its converse", "Swapping quantifier order", "Counting permutations when order is irrelevant", "Stating an invariant without preservation", "Using examples as universal proof"],
    question: { id: "discrete-handshakes", type: "puzzle", difficulty: "medium", timeboxMinutes: 10, prompt: "In a group of n people, each pair shakes hands once. Derive the total in two ways.", hints: ["Choose an unordered pair.", "Sum degrees and correct double counting."], answer: "Choose two participants: C(n,2)=n(n-1)/2. Or sum n degrees of n-1 and divide by two because each handshake contributes to two degrees.", rubric: ["Correct formula", "Combination derivation", "Degree-sum derivation", "Explains double counting"], tags: ["combinatorics", "graphs", "proof"] },
    flashcards: [{ front: "Contrapositive of P→Q?", back: "¬Q→¬P." }, { front: "Loop proof parts?", back: "Initialization, maintenance, termination." }, { front: "Handshaking lemma?", back: "Degree sum equals twice the edge count." }],
    revision: ["Write domains and quantifiers", "Separate ordered from unordered counting", "Check double counting", "Use base and step", "Prove loop initialization, maintenance, termination"],
    sources: [{ label: "MIT Mathematics for Computer Science", url: "https://courses.csail.mit.edu/6.042/spring18/mcs.pdf" }, { label: "Open Logic Project", url: "https://builds.openlogicproject.org/" }]
  },
  "foundations/linear-algebra": {
    summary: "Understand vectors, matrices, projections, eigenstructure, and gradients as the language of ML and quantitative models.",
    durationMinutes: 70, level: "foundation", roleIds: ["ai-engineer", "ml-engineer", "data-scientist", "quant-dev", "quant-research"], prerequisites: ["foundations/discrete-mathematics"],
    outcomes: ["Interpret matrix operations geometrically", "Reason about rank, basis, and projections", "Connect decompositions to ML"],
    conceptMap: ["Vectors encode coordinates and directions", "Matrices are linear transformations", "Rank counts independent surviving directions", "Projection finds the closest subspace component"],
    keyIdea: "Track shapes and geometry together: algebra says what is legal; geometry says what it does.",
    analogy: { title: "A machine that reshapes space", body: "A matrix sends basis arrows to new locations. Rank counts surviving independent directions; eigenvectors keep their direction." },
    theory: [
      { heading: "Vectors and transformations", body: "Dot products measure aligned magnitude and define norms and angles. An m×n matrix maps R^n to R^m. Matrix multiplication composes transformations and is not commutative." },
      { heading: "Rank and projection", body: "A basis spans with independent vectors. Rank reveals redundant features or underdetermined systems. Projection onto unit u is (uᵀx)u; least squares projects a target onto the design matrix's column space." },
      { heading: "Eigenvalues and SVD", body: "An eigenvector preserves direction under a square transformation. Symmetric covariance matrices have orthogonal eigenvectors. SVD A=UΣVᵀ works for any matrix and exposes rank, conditioning, and low-rank approximation." }
    ],
    example: { title: "Project onto a direction", language: "python", code: `import numpy as np
x = np.array([3.0, 4.0])
u = np.array([1.0, 1.0])
u = u / np.linalg.norm(u)
projection = (u @ x) * u
residual = x - projection
assert np.isclose(residual @ u, 0.0)`, explanation: "The residual is orthogonal to the target line, the condition behind least squares." },
    failureModes: ["Ignoring shapes", "Assuming multiplication commutes", "Confusing element-wise and matrix products", "Explicitly inverting instead of solving", "Ignoring scaling in distance-based reasoning"],
    question: { id: "linear-algebra-rank", type: "short", difficulty: "medium", timeboxMinutes: 12, prompt: "A design matrix has two perfectly collinear columns. What happens to rank, normal equations, and interpretation?", hints: ["One column is a combination of another.", "Is XᵀX invertible?"], answer: "Column rank falls and XᵀX is singular, so coefficients are not uniquely identifiable. Predictions in the spanned subspace may remain defined. Remove/merge a feature, use a pseudoinverse, or regularize, and interpret coefficients cautiously.", rubric: ["Rank deficiency", "Singular/non-unique coefficients", "Prediction vs identification", "Sound remedy"], tags: ["linear-algebra", "regression", "rank"] },
    flashcards: [{ front: "A(m×n)x(n) shape?", back: "m." }, { front: "Rank?", back: "Number of independent column directions." }, { front: "Projection residual?", back: "Orthogonal to the target subspace." }],
    revision: ["Write dimensions", "Connect dot product to projection", "Use rank for redundancy", "Know SVD handles rectangles", "Solve systems instead of forming inverses"],
    sources: [{ label: "MIT Linear Algebra", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" }, { label: "NumPy linear algebra", url: "https://numpy.org/doc/stable/reference/routines.linalg.html" }]
  },
  "foundations/probability": {
    summary: "Model uncertainty with conditional probability, random variables, expectation, variance, and common distributions.",
    durationMinutes: 75, level: "foundation", roleIds: ["ai-engineer", "ml-engineer", "data-scientist", "security", "fintech", "quant-dev", "quant-research"], prerequisites: ["foundations/discrete-mathematics"],
    outcomes: ["Compute conditional and total probability", "Apply Bayes with base rates", "Use expectation, variance, and distribution assumptions correctly"],
    conceptMap: ["A model assigns probability to events", "Conditioning changes the sample space", "Random variables map outcomes to numbers", "Expectation is linear without independence"],
    keyIdea: "Write the experiment, events, and evidence before calculating; most errors silently change the sample space.",
    analogy: { title: "Filtering a deck", body: "Conditioning removes outcomes inconsistent with evidence and renormalizes what remains." },
    theory: [
      { heading: "Conditional probability", body: "P(A|B)=P(A∩B)/P(B). Total probability partitions causes. Bayes reverses a condition by likelihood×prior/evidence. The prior dominates rare-event interpretation." },
      { heading: "Moments", body: "Expectation is a weighted average and always adds when defined. Var(X)=E[X²]-E[X]². Variances add for independent variables; covariance supplies cross terms otherwise." },
      { heading: "Distributions", body: "Bernoulli models a binary trial, binomial independent equal-probability success counts, geometric waiting time, and normal aggregated effects. Zero covariance does not generally imply independence." }
    ],
    example: { title: "Rare-event base rate", language: "text", code: `P(fraud)=0.001
P(alert|fraud)=0.95
P(alert|legitimate)=0.01

P(fraud|alert)
= 0.95*0.001 / (0.95*0.001 + 0.01*0.999)
≈ 0.087`, explanation: "Even 95% sensitivity produces only about 8.7% fraud among alerts because legitimate events dominate." },
    failureModes: ["Assuming equal likelihood", "Reversing a conditional", "Ignoring base rates", "Adding variances under dependence", "Using a distribution without process assumptions"],
    question: { id: "probability-two-children", type: "puzzle", difficulty: "medium", timeboxMinutes: 12, prompt: "A two-child family has at least one boy. Under independent equally likely sexes, what is P(both boys), and why can the reporting process change it?", hints: ["List ordered outcomes.", "Condition on how the statement was produced."], answer: "Given the event, consistent equally likely outcomes are BB, BG, GB, so 1/3. If a randomly selected child was reported instead, likelihoods differ. Conditional probability includes the evidence-generation protocol.", rubric: ["Gets 1/3", "Uses conditioned ordered outcomes", "Notes reporting mechanism"], tags: ["probability", "conditional", "bayes"] },
    flashcards: [{ front: "Bayes numerator?", back: "Likelihood × prior." }, { front: "Expectation needs independence to add?", back: "No." }, { front: "Zero covariance implies independence?", back: "Not generally." }],
    revision: ["Define sample space", "Condition and renormalize", "Use total probability", "Include base rates", "Check independence assumptions"],
    sources: [{ label: "Harvard Stat 110", url: "https://projects.iq.harvard.edu/stat110/home" }, { label: "NIST probability distributions", url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda36.htm" }]
  },
  "foundations/statistics": {
    summary: "Estimate, test, and communicate uncertainty while separating association, prediction, and causal claims.",
    durationMinutes: 80, level: "foundation", roleIds: ["ai-engineer", "ml-engineer", "data-scientist", "data-engineer", "fintech", "quant-dev", "quant-research"], prerequisites: ["foundations/probability"],
    outcomes: ["Interpret estimators and intervals", "Design and critique tests", "Detect bias, leakage, and causal overclaiming"],
    conceptMap: ["A sample informs a population", "Estimators vary across samples", "Intervals and tests quantify uncertainty under assumptions", "Study design limits defensible claims"],
    keyIdea: "A statistical number is inseparable from its data-generating process, assumptions, and uncertainty.",
    analogy: { title: "A noisy instrument", body: "Bias is systematic miscalibration; variance is how much repeated readings wobble." },
    theory: [
      { heading: "Estimation", body: "An estimator is a sampling rule; an estimate is its observed value. Bias is expected error, variance is sampling dispersion, and MSE combines them. Standard error measures estimator variability." },
      { heading: "Intervals and tests", body: "A 95% frequentist confidence procedure covers the fixed parameter in 95% of repeated samples under assumptions. A p-value is probability of data this incompatible under the null, not probability the null is true. Report effect size and uncertainty." },
      { heading: "Bias and causality", body: "Selection, measurement, survivorship, confounding, multiple testing, and optional stopping distort inference. Randomization supports causal attribution; prediction accuracy alone does not." }
    ],
    example: { title: "Difference in conversion", language: "python", code: `import math
p_a, n_a = 0.10, 4000
p_b, n_b = 0.112, 4100
diff = p_b - p_a
se = math.sqrt(p_a*(1-p_a)/n_a + p_b*(1-p_b)/n_b)
interval = (diff - 1.96*se, diff + 1.96*se)`, explanation: "The estimate is a 1.2 percentage-point lift; the interval communicates sampling uncertainty under independent large-sample assumptions." },
    failureModes: ["p-value as P(null)", "Non-significance as no effect", "Ignoring multiplicity", "Relative lift without baseline", "Causation from correlation"],
    question: { id: "statistics-ab-test", type: "case", difficulty: "medium", timeboxMinutes: 18, prompt: "An A/B test reports p=0.03 after daily checks and stopping at the first p<0.05. Critique and repair the plan.", hints: ["Stopping rule is part of the procedure.", "Repeated looks inflate false positives."], answer: "Unplanned peeking invalidates a fixed-horizon p-value. Predeclare sample size and analysis or use a valid sequential design with alpha spending/e-values. Report effect and interval, verify assignment and guardrails, and document all metrics and exclusions.", rubric: ["Identifies optional stopping", "Explains inflation", "Valid fixed/sequential remedy", "Effect and design checks"], tags: ["statistics", "experimentation", "hypothesis-testing"] },
    flashcards: [{ front: "p-value?", back: "Under the null/model, probability of data at least this incompatible." }, { front: "95% CI?", back: "The procedure covers the fixed parameter in 95% of repeated samples." }, { front: "MSE relation?", back: "Variance plus squared bias." }],
    revision: ["Name population and estimand", "Report effect and uncertainty", "Check assumptions/stopping", "Control multiplicity", "Separate association, prediction, causality"],
    sources: [{ label: "NIST Statistics Handbook", url: "https://www.itl.nist.gov/div898/handbook/" }, { label: "ASA p-value statement", url: "https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf" }]
  }
};
