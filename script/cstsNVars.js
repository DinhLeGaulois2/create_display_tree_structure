/////////////////////////////////////////////////
const _minSize = 5                             //
const _maxSize = 50                            //
const _totalNodesCst = 20                      //
//
// this value could be changed by the user...  //
let _totalNodes = _totalNodesCst               //
//
let globalTree = {}                            //
//
let path = []                                  //
/////////////////////////////////////////////////

const PATH_ON_THE_WAY = "path_on_the_way"
const PATH_ACTIVE = "path_active"
const PATH_NOTHING = "path_nothing"