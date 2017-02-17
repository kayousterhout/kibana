var Elasticsearch = require("github.com/quilt/elasticsearch").Elasticsearch;
var Kibana = require("github.com/quilt/kibana").Kibana;

var clusterSize = 2;

var deployment = createDeployment({});
var baseMachine = new Machine({provider: "Amazon"});
deployment.deploy(baseMachine.asMaster());
deployment.deploy(baseMachine.asWorker().replicate(clusterSize));

var es = new Elasticsearch(clusterSize);
var kib = new Kibana(es).public();
deployment.deploy([es, kib]);
