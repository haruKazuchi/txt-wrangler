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
            var parentFolder = null;
            // builds the hierarchy of folders.
            paths.map(path => {
                if (!parentFolder) {
                    if (!hierarchy[path]) {
                        hierarchy[path] = {
                            name: path,
                            children: {},
                            files: [],
                        };
                    }
                    parentFolder = hierarchy[path]
                } else {
                    if (!parentFolder.children[path]) {
                        parentFolder.children[path] = {
                            name: path,
                            children: {},
                            files: [],
                        };
                    }
                    parentFolder = parentFolder.children[path]
                }
            });
            parentFolder.files.push(file.path.split('/').slice(-1))
        });
				this.showScreen(hierarchy)
			})
		},
		showScreen: function(hierarchy){
			var $outputscreen = $('#outputscreen')

			$outputscreen.val(JSON.stringify(hierarchy, undefined, 2))
		}

	}

	$(function() {
		Main.init();
	})
})(jQuery)