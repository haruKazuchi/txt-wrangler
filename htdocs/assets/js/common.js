(function($) {
	Main = {
		init: function(){
			this.readFile();
		},
		readFile: function(){
			$('#file').on('change', () => {
				var data = []
				for (var i = 0; i < event.target.files.length; i++) {
					// console.log(event.target.files[i].webkitRelativePath.split('/'))
					var obj = {'path': event.target.files[i].webkitRelativePath}
					data.push(obj)
					// data.push(event.target.files[i].webkitRelativePath.split('/'))
				}
				var rootName = event.target.files[0].webkitRelativePath.split('/').slice(0,1)
				// console.log(event.target.files);
				// var rootH = ""
				// var hierarchy

				// for (var i = 0; i < data.length; i++) {
				// 	console.log(data[i][0])
				// }
				// console.log(JSON.stringify(data));

				// console.log(data);
				var hierarchy = {}
				data.map(file => {
            var paths = file.path.split('/').slice(0, -1)
            var parentFolder = null
						var $outputscreen = $('#outputscreen')
						var tabLevel = 0
            // builds the hierarchy of folders.
            paths.map(path => {
                if (!parentFolder) {
                    if (!hierarchy[path]) {
                        hierarchy[path] = {
                            id: path,
                            children: {},
                            text: [],
                        };
												$outputscreen.val($outputscreen.val() + path);
                    }
                    parentFolder = hierarchy[path]
                } else {
                    if (!parentFolder.children[path]) {
                        parentFolder.children[path] = {
                            id: path,
                            children: {},
                            text: [],
                        };
												$outputscreen.val($outputscreen.val() + '\r\n' + '\r\n' + this.tabLevel(tabLevel) + path);
                    }
                    parentFolder = parentFolder.children[path]
                }
							tabLevel++
            });
            parentFolder.text.push(file.path.split('/').slice(-1))
						$outputscreen.val($outputscreen.val() + '\r\n' + this.tabLevel(tabLevel) + file.path.split('/').slice(-1));
        });
				this.showScreen(hierarchy,rootName)
			})
		},
		showScreen: function(hierarchy, rootName){
			console.log(rootName)
			var $outputscreen = $('#outputscreen')
			// $outputscreen.val(JSON.stringify(hierarchy, undefined, 2))
		},
		tabLevel: function(level){
			var tab = ''
			for (var i = 0; i < level; i++) {
				tab += '\t'
			}
			return tab
		}

	}

	$(function() {
		Main.init();
	})
})(jQuery)