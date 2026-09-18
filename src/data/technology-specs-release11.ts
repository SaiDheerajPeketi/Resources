import type { TechnologySpec } from "@/data/technology-factory";

type Row = [id: string, title: string, ecosystem: TechnologySpec["ecosystem"], kind: TechnologySpec["kind"], docs: string, repository: string, command: string];
const rows: Row[] = [
  ["android", "Android", "mobile", "mobile", "https://developer.android.com/docs", "https://cs.android.com/", "./gradlew assembleDebug"],
  ["jetpack-compose", "Jetpack Compose", "mobile", "mobile", "https://developer.android.com/compose", "https://cs.android.com/androidx/platform/frameworks/support/+/androidx-main:compose/", "./gradlew testDebugUnitTest"],
  ["ios", "iOS", "mobile", "mobile", "https://developer.apple.com/documentation/", "https://github.com/apple/swift", "xcodebuild -scheme App build"],
  ["swiftui", "SwiftUI", "mobile", "mobile", "https://developer.apple.com/documentation/swiftui", "https://github.com/apple/swift", "xcodebuild test -scheme App"],
  ["react-native", "React Native", "mobile", "mobile", "https://reactnative.dev/docs/getting-started", "https://github.com/facebook/react-native", "npx react-native doctor"],
  ["flutter", "Flutter", "mobile", "mobile", "https://docs.flutter.dev/", "https://github.com/flutter/flutter", "flutter doctor"],
  ["numpy", "NumPy", "data-ai", "data-ai", "https://numpy.org/doc/stable/", "https://github.com/numpy/numpy", "python -m pip install numpy"],
  ["pandas", "pandas", "data-ai", "data-ai", "https://pandas.pydata.org/docs/", "https://github.com/pandas-dev/pandas", "python -m pip install pandas"],
  ["scikit-learn", "scikit-learn", "data-ai", "data-ai", "https://scikit-learn.org/stable/user_guide.html", "https://github.com/scikit-learn/scikit-learn", "python -m pip install scikit-learn"],
  ["pytorch", "PyTorch", "data-ai", "data-ai", "https://docs.pytorch.org/docs/stable/", "https://github.com/pytorch/pytorch", "python -m pip install torch"],
  ["tensorflow-keras", "TensorFlow and Keras", "data-ai", "data-ai", "https://www.tensorflow.org/guide", "https://github.com/tensorflow/tensorflow", "python -m pip install tensorflow"],
  ["hugging-face", "Hugging Face", "data-ai", "data-ai", "https://huggingface.co/docs", "https://github.com/huggingface/transformers", "python -m pip install transformers"],
  ["langchain", "LangChain", "data-ai", "data-ai", "https://python.langchain.com/docs/", "https://github.com/langchain-ai/langchain", "python -m pip install langchain"],
  ["llamaindex", "LlamaIndex", "data-ai", "data-ai", "https://docs.llamaindex.ai/", "https://github.com/run-llama/llama_index", "python -m pip install llama-index"],
  ["spark-pyspark", "Spark and PySpark", "data-ai", "data-ai", "https://spark.apache.org/docs/latest/", "https://github.com/apache/spark", "spark-submit job.py"],
  ["kafka", "Apache Kafka", "data-ai", "data-ai", "https://kafka.apache.org/documentation/", "https://github.com/apache/kafka", "bin/kafka-topics.sh --bootstrap-server localhost:9092 --list"],
  ["airflow", "Apache Airflow", "data-ai", "data-ai", "https://airflow.apache.org/docs/", "https://github.com/apache/airflow", "airflow dags list"],
  ["dbt", "dbt", "data-ai", "data-ai", "https://docs.getdbt.com/docs/introduction", "https://github.com/dbt-labs/dbt-core", "dbt build"],
  ["jupyter", "Jupyter", "data-ai", "tool", "https://docs.jupyter.org/", "https://github.com/jupyter/jupyter", "jupyter lab"],
  ["git", "Git", "devops", "tool", "https://git-scm.com/docs", "https://github.com/git/git", "git status --short"],
  ["linux", "Linux Operations", "devops", "platform", "https://docs.kernel.org/", "https://github.com/torvalds/linux", "uname -a"],
  ["docker", "Docker", "devops", "platform", "https://docs.docker.com/", "https://github.com/moby/moby", "docker system info"],
  ["kubernetes", "Kubernetes", "devops", "platform", "https://kubernetes.io/docs/home/", "https://github.com/kubernetes/kubernetes", "kubectl cluster-info"],
  ["helm", "Helm", "devops", "tool", "https://helm.sh/docs/", "https://github.com/helm/helm", "helm lint ./chart"],
  ["terraform", "Terraform", "devops", "tool", "https://developer.hashicorp.com/terraform/docs", "https://github.com/hashicorp/terraform", "terraform plan"],
  ["ansible", "Ansible", "devops", "tool", "https://docs.ansible.com/", "https://github.com/ansible/ansible", "ansible-playbook --check playbook.yml"],
  ["cicd", "CI/CD Pipelines", "devops", "platform", "https://docs.github.com/actions", "https://github.com/actions/runner", "act --list"],
  ["observability", "Observability", "devops", "platform", "https://opentelemetry.io/docs/", "https://github.com/open-telemetry/opentelemetry-specification", "otelcol --config config.yaml"],
  ["aws", "Amazon Web Services", "devops", "platform", "https://docs.aws.amazon.com/", "https://github.com/aws/aws-cli", "aws sts get-caller-identity"],
  ["azure", "Microsoft Azure", "devops", "platform", "https://learn.microsoft.com/azure/", "https://github.com/Azure/azure-cli", "az account show"],
  ["gcp", "Google Cloud", "devops", "platform", "https://cloud.google.com/docs", "https://github.com/twistedpair/google-cloud-sdk", "gcloud config list"],
  ["cloud-security", "Cloud and Supply-Chain Security", "devops", "platform", "https://slsa.dev/spec/", "https://github.com/sigstore/cosign", "cosign verify <image>"],
  ["dns-tls", "DNS and TLS Operations", "devops", "platform", "https://www.rfc-editor.org/", "https://github.com/openssl/openssl", "openssl s_client -connect example.com:443 -servername example.com"]
];

const genericCommands = (first: string): Array<[string, string, string]> => [
  ["Run the primary health check", first, "Verify the toolchain or service boundary before deeper work."],
  ["Inspect built-in help", `${first.split(" ")[0]} --help`, "Discover supported commands and flags locally."],
  ["Capture version", `${first.split(" ")[0]} --version`, "Record the tool version in diagnostic evidence."],
  ["Inspect configuration", "rg \"version|image|endpoint|region\" .", "Locate runtime and deployment configuration."],
  ["Review recent changes", "git diff --stat", "Bound the likely source of a regression."],
  ["Run focused verification", "<test-command> --filter <name>", "Shorten the feedback loop around one behavior."],
  ["Time the operation", `time ${first}`, "Measure wall-clock behavior rather than estimating."],
  ["Capture logs", "<tool> logs --since 10m", "Collect a bounded diagnostic window."],
  ["Inspect resource use", "ps -eo pid,pcpu,pmem,comm", "Identify CPU or memory pressure."],
  ["Inspect network listeners", "ss -tulpn", "Confirm service bindings and port ownership."],
  ["Validate before applying", "<tool> validate", "Catch configuration errors before mutation."],
  ["Show the planned change", "<tool> diff", "Review intended state transitions before applying them."]
];

export const release11Specs: TechnologySpec[] = rows.map(([id, title, ecosystem, kind, docs, repository, command]) => ({
  id, title, ecosystem, kind,
  summary: `${title} foundations, architecture, setup, command cookbook, testing, debugging, performance, security, production failure modes, and interview practice.`,
  mentalModel: `${title} is an operational system with inputs, state, lifecycle, resource limits, and observable failure signals. Trace those five things before memorizing APIs.`,
  roles: kind === "mobile" ? ["android", "ios", "mobile", "sde"] : ecosystem === "data-ai" ? ["ai-engineer", "ml-engineer", "data-engineer", "data-scientist"] : ["devops", "sre", "cloud-architect", "security"],
  commands: genericCommands(command),
  sources: [[`${title} official documentation`, docs], [`${title} source or specification repository`, repository], ["NIST secure software development framework", "https://csrc.nist.gov/pubs/sp/800/218/final"]],
  code: [title, `# ${title}: validate inputs, pin versions, run a focused check, and capture observable output.`, "The production-shaped example makes configuration and recovery paths explicit before scaling the happy path."]
}));
