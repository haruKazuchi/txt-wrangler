(function($) {
	Main = {
		init: function(){
			this.readFile()
			this.buttonExcept()
		},
		readFile: function(){
			$('#file').on('change', () => {
				$('#except-button').removeAttr('disabled')
				var $outputscreen = $('#outputscreen')
				$outputscreen.val("")
				var data = []
				for (var i = 0; i < event.target.files.length; i++) {
					var obj = {'path': event.target.files[i].webkitRelativePath}
					data.push(obj)
				}
				var rootName = event.target.files[0].webkitRelativePath.split('/').slice(0,1)

				var hierarchy = {}
				data.map(file => {
            var paths = file.path.split('/').slice(0, -1)
            var parentFolder = null

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
			var $outputscreen = $('#outputscreen')
			// $outputscreen.val(JSON.stringify(hierarchy, undefined, 2))
		},
		tabLevel: function(level){
			var tab = ''
			for (var i = 0; i < level; i++) {
				tab += '\t'
			}
			return tab
		},
		buttonExcept: function(){
			if (document.getElementById('file').files.length == 0) {
				$('#except-button').attr('disabled','disabled')
			}
			else{
				$('#except-button').removeAttr('disabled')
			}
			$('#except-button').on('click',() => {
				console.log("A")
				var $except = $('#except')
				var $outputscreen = $('#outputscreen')
				var except = $except.val().split('\n')
				$outputscreen.val("")
				this.readAgain()
				for (let item of except) {
					var reg = new RegExp(item,'g')
					console.log(item)
					$outputscreen.val($outputscreen.val().replace(reg,function(i){
						i = ''
						return i.replace(/\r\n/,"")
					}))
				}

			})
		},
		readAgain: function(){
			var data = []
			for (var i = 0; i < document.getElementById('file').files.length; i++) {
				var obj = {'path': document.getElementById('file').files[i].webkitRelativePath}
				data.push(obj)
			}
			var rootName = document.getElementById('file').files[0].webkitRelativePath.split('/').slice(0,1)

			var hierarchy = {}
			data.map(file => {
					var paths = file.path.split('/').slice(0, -1)
					var parentFolder = null
					var $outputscreen = $('#outputscreen')
					// var $except = $('#except')
					var tabLevel = 0
					// var except = $except.val().split('\n')
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
		}

	}

	$(function() {
		Main.init();
	})
})(jQuery)