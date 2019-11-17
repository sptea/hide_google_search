import chromeUtil from "./chromeUtil.js";

const SEARCH_RESULT_NODE_CLASS_NAME = "g";

function isNgURI(node, ng_host_list) {
  if (!node.textContent) return false;

  let res = false;
  ng_host_list.forEach(hostName => {
    if (node.textContent.includes(hostName)) res = true;
  });
  return res;
}

async function deleteNgNode() {
  let ng_host_list = [];

  ng_host_list = (await chromeUtil.getHostsFromStrage()).hosts;

  const nodeList = document.getElementsByClassName(
    SEARCH_RESULT_NODE_CLASS_NAME
  );

  for (var i = 0; i < nodeList.length; i++) {
    let node = nodeList[i];
    if (!isNgURI(node, ng_host_list)) continue;
    node.style.display = "none";
  }
}

deleteNgNode();
