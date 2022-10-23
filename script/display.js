const generateSpaces = num => {
    const multiplier = 4
    let result = ""

    for (let i = 0; i < num; i++) {
        result += "&nbsp;|"
        for (let j = 0; j < multiplier; j++) {
            if (i < (num - 1))
                result += "&nbsp;"
            else if (j < multiplier - 1)
                result += "-"
        }
    }
    return result
}

// showing "GRAPHICALLY" the structure of a tree...
const display = (toc) => {
    let result = '<div class="container-toc">'

    for (let i = 0; i < toc.length; i++) {
        let state = isOnPath(toc[i].nodeId)
        if (state === PATH_ACTIVE)
            result += '<div>' + generateSpaces(toc[i].level) +
                '<span id="' + toc[i].nodeId + '" class="node-in-tree-title activeComp node-link" title="id = ' + toc[i].nodeId + ', depth: ' + toc[i].level + '">' +
                globalTree.nodes[toc[i].nodeId.toString()].name + '</span></div>'
        else if (state === PATH_ON_THE_WAY)
            result += '<div>' + generateSpaces(toc[i].level) +
                '<span id="' + toc[i].nodeId + '" class="node-in-tree-title onTheWay node-link" title="id = ' + toc[i].nodeId + ', depth: ' + toc[i].level + '">' +
                globalTree.nodes[toc[i].nodeId.toString()].name + '</span></div>'
        else if (state === PATH_NOTHING)
            result += '<div>' + generateSpaces(toc[i].level) +
                '<span id="' + toc[i].nodeId + '" class="node-in-tree-title node-link" title="id = ' + toc[i].nodeId + ', depth: ' + toc[i].level + '">' +
                globalTree.nodes[toc[i].nodeId.toString()].name + '</span></div>'
    }

    result += '</div>'
    return result
}

// show the structure (data) of a tree
const displayTocStruct = (toc) => {
    let result = "toc = [<br/>"
    for (let i = 0; i < toc.length; i++) {
        if (i < toc.length - 1)
            result += "&nbsp;&nbsp;&nbsp;&nbsp;" + JSON.stringify(toc[i], null, 2) + ',<br/>'
        else result += "&nbsp;&nbsp;&nbsp;&nbsp;" + JSON.stringify(toc[i], null, 2)
    }
    return result + "<br/>]"
}

const showPath = () => {
    let result = ""
    if (path.length > 0)
        for (let i = 0; i < path.length; i++) {
            if (result.length === 0)
                result = "Path: <b>" + globalTree.nodes[path[i].toString()].name
            else result += " &gt; " + globalTree.nodes[path[i].toString()].name
        }
    return result + "</b>"
}