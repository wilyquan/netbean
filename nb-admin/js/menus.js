/* 
 * 菜单数据处理方法
 * 
 * */

////导入AES加密模块
//import {AES} from 'crypto-js'
////导入SHA256加密模块
//import {SHA256} from 'crypto-js'

export default {
	/**
	 * 初始化一级菜单状态
	 * 
	 */
	initMenu(menus) {
		var selectMenu = null;
		for(var i = 0; i < menus.length; i++) {
			var menu = menus[i];
			if(i == 0) {
				menu.selected = true;
				selectMenu = updateSubMenu(menu);

				break;
			}
		}
		return selectMenu;
	},
	/**
	 * 当一级菜单被选中后，更新当前菜单的状态，
	 * 同时返回二级菜单，如果二级菜单没有被选中的菜单，则默认第一个菜单设置为选中，
	 */
	updateMenuSelected(menus, selectMenuId) {
		var subMenu = null;
		var selectMenu = null;
		for(var i = 0; i < menus.length; i++) {
			var menu = menus[i];
			if(menu.id === selectMenuId) {
				menu.selected = true;
				subMenu = menu.subChild;
				//更新二级菜单状态
				selectMenu = updateSubMenu(menu);
			} else {
				menu.selected = false;
			}
		}

		return {subMenu : subMenu, selectMenuItem : selectMenu};
	},
	//更新子菜单选项状态，同时返回选中菜单对象
	updateSubMenuSelected(subMenus, selectMenuId) {
		//		debugger;
		var selectItem = null;
		for(var i = 0; i < subMenus.length; i++) {
			var subMenu = subMenus[i];
			var subChild = subMenu.subChild;
			for(var j = 0; j < subChild.length; j++) {
				var child = subChild[j];
				if(child.id == selectMenuId) {
					child.selected = true;
					selectItem = child;
				} else {
					child.selected = false;
				}
			}
		}
		return selectItem;
	}
}

/**
 * 更新二级菜单的选中状态，
 * 如果没有菜单被选中，则默认第一个菜单设置为选中状态
 * 
 * @param {Object} subMenu
 */
function updateSubMenu(subMenu) {
	var subMenus = subMenu.subChild;
	var selectMenu = null;
	if(subMenus != null) {
		if(subMenus.length > 0) {
			var hasSelected = false;
			var firstMenu = null;
			
			for(var j = 0; j < subMenus.length; j++) {
				var subMs = subMenus[j].subChild;
				//遍历菜单的状态，
				for(var i = 0; i < subMs.length; i++) {
					var sbM = subMs[i];
					if(i == 0 && j == 0) {
						firstMenu = sbM;
					} else {
						if(sbM.selected) {
							hasSelected = true;
							selectMenu = sbM;
						}
					}
				}
			}

			//如果没有选中，则设置第一个菜单为选中
			if(hasSelected) {
				firstMenu.selected = false;
			} else if(!hasSelected && firstMenu != null) {
				firstMenu.selected = true;
				selectMenu = firstMenu;
			}
		}
	}
	
	return selectMenu;

}