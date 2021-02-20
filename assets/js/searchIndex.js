
var camelCaseTokenizer = function (builder) {

  var pipelineFunction = function (token) {
    var previous = '';
    // split camelCaseString to on each word and combined words
    // e.g. camelCaseTokenizer -> ['camel', 'case', 'camelcase', 'tokenizer', 'camelcasetokenizer']
    var tokenStrings = token.toString().trim().split(/[\s\-]+|(?=[A-Z])/).reduce(function(acc, cur) {
      var current = cur.toLowerCase();
      if (acc.length === 0) {
        previous = current;
        return acc.concat(current);
      }
      previous = previous.concat(current);
      return acc.concat([current, previous]);
    }, []);

    // return token for each string
    // will copy any metadata on input token
    return tokenStrings.map(function(tokenString) {
      return token.clone(function(str) {
        return tokenString;
      })
    });
  }

  lunr.Pipeline.registerFunction(pipelineFunction, 'camelCaseTokenizer')

  builder.pipeline.before(lunr.stemmer, pipelineFunction)
}
var searchModule = function() {
    var documents = [];
    var idMap = [];
    function a(a,b) { 
        documents.push(a);
        idMap.push(b); 
    }

    a(
        {
            id:0,
            title:"IDotNetToolContentResolver",
            content:"IDotNetToolContentResolver",
            description:'',
            tags:''
        },
        {
            url:'/Cake.DotNetTool.Module/api/Cake.DotNetTool.Module/IDotNetToolContentResolver',
            title:"IDotNetToolContentResolver",
            description:""
        }
    );
    a(
        {
            id:1,
            title:"DotNetToolContentResolver",
            content:"DotNetToolContentResolver",
            description:'',
            tags:''
        },
        {
            url:'/Cake.DotNetTool.Module/api/Cake.DotNetTool.Module/DotNetToolContentResolver',
            title:"DotNetToolContentResolver",
            description:""
        }
    );
    a(
        {
            id:2,
            title:"DotNetToolModule",
            content:"DotNetToolModule",
            description:'',
            tags:''
        },
        {
            url:'/Cake.DotNetTool.Module/api/Cake.DotNetTool.Module/DotNetToolModule',
            title:"DotNetToolModule",
            description:""
        }
    );
    a(
        {
            id:3,
            title:"DotNetToolOperation",
            content:"DotNetToolOperation",
            description:'',
            tags:''
        },
        {
            url:'/Cake.DotNetTool.Module/api/Cake.DotNetTool.Module/DotNetToolOperation',
            title:"DotNetToolOperation",
            description:""
        }
    );
    a(
        {
            id:4,
            title:"DotNetToolPackage",
            content:"DotNetToolPackage",
            description:'',
            tags:''
        },
        {
            url:'/Cake.DotNetTool.Module/api/Cake.DotNetTool.Module/DotNetToolPackage',
            title:"DotNetToolPackage",
            description:""
        }
    );
    a(
        {
            id:5,
            title:"DotNetToolPackageInstaller",
            content:"DotNetToolPackageInstaller",
            description:'',
            tags:''
        },
        {
            url:'/Cake.DotNetTool.Module/api/Cake.DotNetTool.Module/DotNetToolPackageInstaller',
            title:"DotNetToolPackageInstaller",
            description:""
        }
    );
    var idx = lunr(function() {
        this.field('title');
        this.field('content');
        this.field('description');
        this.field('tags');
        this.ref('id');
        this.use(camelCaseTokenizer);

        this.pipeline.remove(lunr.stopWordFilter);
        this.pipeline.remove(lunr.stemmer);
        documents.forEach(function (doc) { this.add(doc) }, this)
    });

    return {
        search: function(q) {
            return idx.search(q).map(function(i) {
                return idMap[i.ref];
            });
        }
    };
}();
