import request from 'umi-request';

var clusterJson = "init"

export async function getInitialState() {
  request
    .get('/getNodeInCluster')
    .then(function(response) {
      clusterJson = response
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });

  return (
    clusterJson
  );
}

