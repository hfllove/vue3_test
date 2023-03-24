var timer;
	    //定义一个盒子移动的动画函数。
	    /*
	        参数：
	            - obj  要执行动画的对象 
	            - speed    box的移动速度
	            - target     box需要移动的目标距离
				- attr 		box移动的方向
	    */

function getMoving (obj,target,speed,attr,attr2,callback){
			//关闭上一个定时器
                clearInterval(obj.timer);
				/*alert(oldValue);  - 0px */

				/*
	            判断速度的正负值
	            如果从0到800移动，则speed为正
	            如果从800到0移动，则speed为负
				*/
				var current = parseInt(getStyle(obj,attr));
				// console.log(attr+"####attr2")
				
				// console.log(current+"####current")
				if(current > target) {
					speed = - speed;
					obj.style[attr2] = attr + " 1.5s ease"
				}else{
					obj.style[attr] = "translateX(" + 0 + "px)";
					obj.style[attr2] = "none"
					
				}
				//开启一个定时调用,用来执行动画效果
				/*
	            向执行动画的对象中添加一个timer属性，用来保存它自身的定时器标识 
				*/
				obj.timer = setInterval(function(){      
                    //获取元素的left初始值
				    var oldValue = parseInt(getStyle(obj,attr));
				    //增加初始值
				    var newValue = oldValue + speed ;

				    if(speed<0 && newValue<target||speed>0 && newValue>target){
				    	newValue = target;
				    }

				    //将新值赋值给元素的left属性q
				    obj.style[attr] = "translateX(" +newValue + "px)";
				
				    if(newValue === target){
						// console.log(target+"####target")
				    	clearInterval(obj.timer);
				    	callback && callback();
				    }
		        },30);
		    }
//自定义获取元素样式函数
		function getStyle(obj,name) {
			/*
	        [name] 中的name是作为变量的形式传入，这样调用属性时，所返回的值就是name这个属性名所包含的值。
			*/
			//一般浏览器
			/*return getComputedStyle(obj,null)[name];*/

			//IE8浏览器
			/*return obj.currentStyle[name];*/

			/*
	        既然IE8版本的浏览器和一般浏览器不能使用同一种方式，则可以用
	        if 判断语句来对其进行区别使用
	        window.getComputedStyle---把getComputedStyle变量对象变成了属性，这样在判断的时候，即使找不到，也不会报错。
			*/

		    if(window.getComputedStyle){
		    	// return getComputedStyle(obj,null)[name];
                return parseFloat(document.defaultView.getComputedStyle(obj, null)[name].split(',')[4]);
		    }
		    else {
				return obj.currentStyle[name];
			}
		    /*
		    return window.getComputedStyle?getComputedStyle(obj,null)[name]:obj.currentStyle[name];
		    */
		}
