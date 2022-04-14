function containerOpen(event){
}

var bukkit = Java.type('org.bukkit.Bukkit'); 
var manager = bukkit.getPluginManager();
var posXMax = 100
var posXMin = -100
var posYMax = 100
var posYMin = -100
var defaultX = 0
var defaultY = 0
var posX = defaultX
var posY = defaultX

var chapterX = 0 + posX
var chapterY = 0 + posY

var chapterOpened = {11: [11, "customnpcs:textures/gui/osees.craft/gui/button_slider_vert_opened_command.png", 10, -19, 40, 25, 0, 0],
                                    12: [12, "customnpcs:textures/gui/osees.craft/gui/button_slider_vert_opened_info.png", 42, -19, 40, 25, 0, 0],
                                    13: [13, "customnpcs:textures/gui/osees.craft/gui/button_slider_vert_opened_settings.png", 74, -19, 40, 250, 0, 0],
                                    14: [14, "customnpcs:textures/gui/osees.craft/gui/button_slider_vert_opened_admin.png", 106, -19, 40, 25, 0, 0]}
                                    
var chapterClosed = {11: [11, "",  10, -19, 32, 20, "customnpcs:textures/gui/osees.craft/gui/button_slider_vert_command.png", 0, 0],
                                   12: [12, "",  42, -19, 32, 20, "customnpcs:textures/gui/osees.craft/gui/button_slider_vert_info.png", 0, 0],
                                   13: [13, "",  74, -19, 32, 20, "customnpcs:textures/gui/osees.craft/gui/button_slider_vert_settings.png", 0, 0],
                                   14: [14, "",  106, -19, 32, 20, "customnpcs:textures/gui/osees.craft/gui/button_slider_vert_admin.png", 0, 0]}
var commandX = 40 + posX
var commandY = 30 + posY

var commandStepX = 100
var commandStepY = 25
var buttonStartId = 30
var buttonsCount = 10
var pageOpened = 0
var createdButtons = []
var commandButtons

var fastMenuX = 0 + posX
var fastMenuY = 0 + posY

var playerMenuX = 0 + posX
var playerMenuY = 0 + posY

function createButtonsBase(playerName){
    commandButtons = [{"name": "О регионе",
                                      "permission": "worldguard.region.info",
                                      "description": ["Запросить информацию о регионе"],
                                      "command": "rg info"},
                                     {"name": "Спавн",
                                      "permission": "essentials.warps.spawn",
                                      "description": ["Телепортироваться на спавн"],
                                      "command": "warp spawn"},
                                     {"name": "Поставить дом",
                                      "permission": "essentials.sethome",
                                      "description": ["Установить точку дома"],
                                      "command": "sethome"},
                                     {"name": "Дом",
                                      "permission": "essentials.home",
                                      "description": ["Телепортироваться домой"],
                                      "command": "home"},
                                     {"name": "Выживание",
                                      "permission": "essentials.gamemode.survival",
                                      "description": ["Включить режим выживания"],
                                      "command": "gamemode 0"},
                                     {"name": "Креатив",
                                      "permission": "essentials.gamemode.creative",
                                      "description": ["Включить режим креатива"],
                                      "command": "gamemode 1"},
                                     {"name": "Призрак",
                                      "permission": "essentials.gamemode.all",
                                      "description": ["Стать призраком"],
                                      "command": "gamemode 3"},
                                     {"name": "Ясно",
                                      "permission": "essentials.weather",
                                      "description": ["Сделать погоду ясной"],
                                      "command": "weather clear"},
                                     {"name": "День",
                                      "permission": "essentials.day",
                                      "description": ["Установить дневное время суток"],
                                      "command": "day"},
                                     {"name": "Ночь",
                                      "permission": "essentials.night",
                                      "description": ["Установить ночное время суток"],
                                      "command": "night"},
                                     {"name": "1000 Гинар",
                                      "permission": "essentials.eco",
                                      "description": ["Получить 1000 Гинар"],
                                      "command": "eco give " + playerName + " 1000"},
                                     {"name": "1000 Эфир",
                                      "permission": "playerpoints.give",
                                      "description": ["Получить 1000 Эфир"],
                                      "command": "points give " + playerName + " 1000"},
                                     {"name": "АФК",
                                      "permission": "essentials.afk",
                                      "description": ["Установить статус АФК"],
                                      "command": "afk"}]
    }                                   

var infoStartId = 100
var infoX = 0 + posX
var infoY = 0 + posY

var settingsStartId = 125
var settingsX = 0 + posX
var settingsY = 0 + posY

var adminStartId = 150
var buttonAdminMenu = []
var adminX = 0 + posX
var adminY = 0 + posY
var times = ["1", "10", "20", "30", "60", "120", "300", "1440"]
var causes = ["Нарушение правил сервера", "Гриферство", "Использование запрещенных предметов" , "Страшная рожа", "Отсутсвие чувства юмора", "Маленький писюн", "Просто оказалася в ненужном месте, в ненужное время"]

function init(event){
}

function keyPressed(event){
//event.player.message(event.key)
    if(event.key == 45){
        openGui(event, 11)
    }
}

function openGui(event, openedMenu){
        var playerName = event.player.getName()
        var player = bukkit.getPlayer(playerName)
        createdButtons = []
        pageOpened = 0
        createButtonsBase(playerName)
        
        var ginar = event.API.executeCommand(event.player.world, "papi parse " + playerName + " %vault_eco_balance%").slice(0,-1)
        var ephir = event.API.executeCommand(event.player.world, "papi parse " + playerName + " %playerpoints_points%").slice(0,-1)
    
        var gui = event.API.createCustomGui(1, 300, 300, false);
        gui.addTexturedRect(1, "customnpcs:textures/gui/osees.craft/gui/server_menu.png", -180 + posX, 0 + posY, 256, 256, 0, 0)
        gui.getComponent(1).setScale(2)
        
        gui.showPlayerInventory(-28 + playerMenuX, 140 + playerMenuY)
        
        gui.addLabel(2, "§l" + ginar, -10 + playerMenuX, 205 + playerMenuY, 100, 20)
        gui.addLabel(3, "§l" + ephir, -10 + playerMenuX, 233 + playerMenuY, 100, 20)
        
        gui.addLabel(5, "§lГинар:", -168 + fastMenuX, 10 + fastMenuY, 85, 60)
        gui.addTextField(6, -133 + fastMenuX, 34 + fastMenuY, 30, 10)
        gui.addLabel(7, "§lИгрок:", -95 + fastMenuX, 10 + fastMenuY, 85, 60)
        gui.addTextField(8, -62 + fastMenuX, 34 + fastMenuY, 40, 10)
        gui.addTexturedButton(9, " Перевести", -133 + fastMenuX, 49 + fastMenuY, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
        
        openChapter(gui, openedMenu)//заняты id 11, 12, 13, 14
        gui.addLabel(10, "§lНазвание региона:", -160 + fastMenuX, 70 + fastMenuY, 250, 50)
        gui.addTextField(15, -70 + fastMenuX, 90 + fastMenuY, 50, 10)
        gui.addTexturedButton(16, "§dТочка 1", -165 + fastMenuX, 105 + fastMenuY, 42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
        gui.getComponent(16).setHoverText(["Установить первую точку", "Команда: //pos1"]);
        gui.addTexturedButton(17, "§dТочка 2", -55 + fastMenuX, 105 + fastMenuY, 42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
        gui.getComponent(17).setHoverText(["Установить вторую точку", "Команда: //pos2"]);
        gui.addTexturedButton(18, "§aСоздать", -110 + fastMenuX, 105 + fastMenuY, 42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
        gui.getComponent(18).setHoverText(["Создать личный регион с выбранным названием"]);
        gui.addTexturedButton(19, "§4Удалить", -110 + fastMenuX, 127 + fastMenuY, 42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
        gui.getComponent(19).setHoverText(["Удалить личный регион с выбранным названием"]);
        gui.addLabel(20, "§lИгрок:", -130 + fastMenuX, 133 + fastMenuY, 90, 50)
        gui.addTextField(21, -95 + fastMenuX, 153 + fastMenuY, 50, 10)
        gui.addTexturedButton(22, "§aДобавить", -165 + fastMenuX, 167 + fastMenuY, 42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
        gui.getComponent(22).setHoverText(["Добавить игрока в регион"]);
        gui.addTexturedButton(23, "§4Удалить", -55 + fastMenuX, 167 + fastMenuY, 42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
        gui.getComponent(23).setHoverText(["Удалить игрока из региона"]);
        gui.addTexturedButton(24, "", -20 + fastMenuX, 34 + fastMenuY, 10, 10, "customnpcs:textures/gui/osees.craft/gui/button2_plus.png", 0, 0);
        
        switch(openedMenu){
            case 11: createCommandButton(gui, player, pageOpened)
            break
            case 12: createInfoItems(gui)
            break
            case 13: createSettinsItems(gui)
            break
            case 14: createAdminItems(gui)
            break
        }

        event.player.showCustomGui(gui);
}

function customGuiButton(event){
    var playerName = event.player.getName()
    var player = bukkit.getPlayer(playerName)
    var gui = event.gui
    
    if(event.buttonId == 11){//меню команд
        clearInfoItems(gui)
        clearAdminItems(gui)
        clearSettinsItems(gui)
        
        createCommandButton(gui, player, pageOpened)
        
        openChapter(gui, 11)
    }
    else if(event.buttonId == 12){//меню информации
        clearAdminItems(gui)
        clearCommandButtons(gui)
        clearSettinsItems(gui)
        
        createInfoItems(gui)
        
        openChapter(gui, 12)
    }
    else if(event.buttonId == 13){//меню настроек
        clearAdminItems(gui)
        clearCommandButtons(gui)
        clearInfoItems(gui)
        
        createSettinsItems(gui)
        
        openChapter(gui, 13)
    }
    else if(event.buttonId == 14){//меню админов
        clearCommandButtons(gui)
        clearInfoItems(gui)
        clearSettinsItems(gui)
        
        createAdminItems(gui)
        
        openChapter(gui, 14)
    }
    else if(event.buttonId == 16){
        event.API.executeCommand(event.player.world,"sudo " + playerName + " /pos1")
    }
    else if(event.buttonId == 17){
        event.API.executeCommand(event.player.world,"sudo " + playerName + " /pos2")
    }
    else if(event.buttonId == 18){
        var region = event.gui.getComponent(15).getText()
        event.API.executeCommand(event.player.world,"sudo " + playerName + " region claim " + region)
    }
    else if(event.buttonId == 19){
        var region = event.gui.getComponent(15).getText()
        event.API.executeCommand(event.player.world,"sudo " + playerName + " region remove " + region)
    }
    else if(event.buttonId == 22){
        var region = event.gui.getComponent(15).getText()
        var playerRegion = event.gui.getComponent(21).getText()
        event.API.executeCommand(event.player.world,"sudo " + playerName + " region addmember " + region + " " + playerRegion)
    }
    else if(event.buttonId == 23){
        var region = event.gui.getComponent(15).getText()
        var playerRegion = event.gui.getComponent(21).getText()
        event.API.executeCommand(event.player.world,"sudo " + playerName + " region removemember " + region + " " + playerRegion)
    }
    else if(event.buttonId == 24){
        var playerNames = getPlayersName(event)
        gui.removeComponent(25)
        gui.addScroll(25, -34 + fastMenuX, 45 + fastMenuY, 50, 40, playerNames)
    }
    else if(buttonStartId <= event.buttonId && event.buttonId < infoStartId){
        var button = commandButtons[createdButtons[event.buttonId - buttonStartId + pageOpened * buttonsCount]]
        event.API.executeCommand(event.player.world,"sudo " + playerName + " " + button["command"])
    }
    else if(infoStartId <= event.buttonId && event.buttonId < settingsStartId){
    }
    else if(settingsStartId <= event.buttonId && event.buttonId < adminStartId){
        var horizont = event.gui.getComponent(settingsStartId + 2).getText()
        var vertical = event.gui.getComponent(settingsStartId + 4).getText()
        switch(event.buttonId){
            case settingsStartId + 5: 
            
                if(horizont > posXMax){
                    horizont = posXMax
                }
                else if(horizont < posXMin){
                    horizont = posXMin
                } 
                
                if(vertical > posYMax){
                    vertical = posYMax
                }
                else if(vertical < posYMin){
                    vertical = posYMin
                }
                posX =  Number(horizont)
                posY =  Number(vertical)
                updateConstants()
                event.player.closeGui()
                event.player.closeGui()
                openGui(event, 13)
            break;
            case settingsStartId + 6:
                posX =  defaultX
                posY =  defaultY
                updateConstants()
                event.player.closeGui()
                openGui(event, 13)
            break;
        }
    }
    else if(adminStartId <= event.buttonId){
        var wPlayer = event.gui.getComponent(adminStartId + 1).getText()
        var cause = event.gui.getComponent(adminStartId + 3).getText()
        var time = event.gui.getComponent(adminStartId + 5).getText()
        var command
        switch(event.buttonId){
            case adminStartId + 8: command = "tp " + wPlayer
            break;
            case adminStartId + 9: command = "tp " + playerName + " " + wPlayer
            break;
            case adminStartId + 10: command = "ban " + wPlayer + " " + cause
            break;
            case adminStartId + 11: command = "kick " + wPlayer + " " + cause
            break;
            case adminStartId + 12: command = "banip " + wPlayer + " " + cause
            break;
            case adminStartId + 13: command = "tjail " + wPlayer + " 10" 
            break;
            case adminStartId + 14: command = "unban " + wPlayer 
            break;
            case adminStartId + 15: command = "unjail " + wPlayer 
            break;
            case adminStartId + 16: command = "invsee " + wPlayer 
            break;
            case adminStartId + 17: command = "kill " + wPlayer 
            break;
            case adminStartId + 18: command = "mute " + wPlayer + " " + time + "m " + cause
            break;
            case adminStartId + 19: command = "tempban " + wPlayer + " " + time + "m " + cause
            break;
            case adminStartId + 20: command = "burn " + wPlayer + " " + time
            break;
            case adminStartId + 21: command = "clearinventory " + wPlayer
            break;
            case adminStartId + 22: 
                var playerNames = getPlayersName(event)
                gui.removeComponent(adminStartId + 23)
                gui.addScroll(adminStartId + 23, 120 + adminX, 5 + adminY, 70, 40, playerNames)
            break;
            case adminStartId + 24: 
                var playerNames = getPlayersName(event)
                gui.removeComponent(adminStartId + 25)
                gui.addScroll(adminStartId + 25, 250 + adminX, 5 + adminY, 100, 40, causes)
            break;
            case adminStartId + 26: 
                var playerNames = getPlayersName(event)
                gui.removeComponent(adminStartId + 27)
                gui.addScroll(adminStartId + 27, 250 + adminX, 15 + adminY, 100, 40, times)
            break;
            case adminStartId + 28: 
                var playerNames = getPlayersName(event)
                gui.removeComponent(adminStartId + 29)
                gui.addScroll(adminStartId + 29, 120 + adminX, 5 + adminY, 70, 40, ["'ненужное никому мнение'"])
            break;
        }
        if(command != null){
            event.API.executeCommand(event.player.world,"sudo " + playerName + " " + command)
        }
    }
    else if(event.buttonId == 29){
        event.API.executeCommand(event.player.world,"sudo " + playerName + " suicide")
    }
    else if(event.buttonId == 27){
        clearCommandButtons(gui)
        pageOpened--
        createCommandButton(gui, player, pageOpened)
    }
    else if(event.buttonId == 28){
        clearCommandButtons(gui)
        pageOpened++
        createCommandButton(gui, player, pageOpened)
    }
    else if(event.buttonId == 9){
        var summ = event.gui.getComponent(6).getText()
        var playerTrader = event.gui.getComponent(8).getText()
        //event.player.message(playerTrader)
        var apply = event.API.executeCommand(event.player.world,"sudo " + playerName + " pay " + playerTrader + " " + summ)
    }
    gui.update(event.player)
}

function customGuiScroll(event) {
    var gui = event.gui
    var scrollSelection = event.selection;
    if(event.scrollId == adminStartId + 23){
        gui.getComponent(adminStartId + 1).setText(scrollSelection[0])
        gui.removeComponent(adminStartId + 23)
    }
    else if(event.scrollId == 25){
        gui.getComponent(8).setText(scrollSelection[0])
        gui.removeComponent(25)
    }
    else if(event.scrollId == adminStartId + 25){
        gui.getComponent(adminStartId + 3).setText(scrollSelection[0])
        gui.removeComponent(adminStartId + 25)
    }
    else if(event.scrollId == adminStartId + 27){
        gui.getComponent(adminStartId + 5).setText(scrollSelection[0])
        gui.removeComponent(adminStartId + 27)
    }
    else if(event.scrollId == adminStartId + 29){
        gui.getComponent(adminStartId + 7).setText(scrollSelection[0])
        gui.removeComponent(adminStartId + 29)
    }
    gui.update(event.player)
}

function openChapter(gui, id){
    var chapterId = [11, 12 ,13, 14]
    gui.removeComponent(11)
    gui.removeComponent(12)
    gui.removeComponent(13)
    gui.removeComponent(14)
    chapterId.splice(chapterId.indexOf(id), 1)
    var opened = chapterOpened[id]
    gui.addTexturedRect(opened[0],opened[1],opened[2] + chapterX,opened[3] + chapterY,opened[4],opened[5],opened[6],opened[7])

    for(var i in chapterId){
        var closed = chapterClosed[chapterId[i]]
        gui.addTexturedButton(closed[0],closed[1],closed[2] + chapterX,closed[3] + chapterY,closed[4],closed[5],closed[6],closed[7],closed[8])
    }
    gui.getComponent(11).setHoverText("Команды");
    gui.getComponent(12).setHoverText("Информация о сервере");
    gui.getComponent(13).setHoverText("Настройки");
    gui.getComponent(14).setHoverText("Меню администрации");
}

function createCommandButton(gui, player, page){
    createdButtons = []
    for(var i in commandButtons){
        var hasPermission = player.hasPermission(commandButtons[i]["permission"])
        if(hasPermission){
            createdButtons.push(i)    
        }
    }
    
    var pages = Math.floor(createdButtons.length/buttonsCount)
    var modifOut = buttonsCount +  buttonsCount * page
    if(page == pages){modifOut = createdButtons.length}
    
    var viewId = createdButtons.slice(buttonsCount * page, modifOut)
    
    for(var k in viewId){
        var id = viewId[k]
        var button = commandButtons[id]
        var x = commandX + k * commandStepX - Math.floor(k/2)*2*commandStepX
        var y = commandY + Math.floor(k/2) * commandStepY
        var createdId = buttonStartId + Number(k)
            //player.sendRawMessage(createdId)
        gui.addTexturedButton(createdId, button["name"], x, y, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
        gui.getComponent(createdId).setHoverText(button["description"]);
        
    }
    
    if(page > 0){
         gui.addTexturedButton(27, "", 0 + commandX, 130 + commandY, 33, 16, "customnpcs:textures/gui/osees.craft/gui/button_next_left.png", 0, 0);
    }
    
    if(createdButtons.length - modifOut > 0){
         gui.addTexturedButton(28, "", 160 + commandX, 130 + commandY, 33, 16, "customnpcs:textures/gui/osees.craft/gui/button_next_right.png", 0, 0);
    }
    
    gui.addLabel(26, "§lДоступные команды", 50 + commandX, -15 + commandY, 100, 10)
    gui.addTexturedButton(29, "§4Уничтожить мусор!", 50 + commandX, 130 + commandY, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
}

function clearCommandButtons(gui){
    gui.removeComponent(26)
    gui.removeComponent(27)
    gui.removeComponent(28)
    gui.removeComponent(29)
    var i = 0
    while(i < buttonsCount){
        gui.removeComponent(buttonStartId + i)
        i++
    }
}

function createInfoItems(gui){
    gui.addLabel(infoStartId, "§lПриветвую в данном разделе! К сожаленю раздел еще не оживлен, со временем здесь будет появлять информация связанная с работой сервера и его новостями. А в данный момент хорошей игры!", 40 + infoX, 30 + infoY, 200, 100)
}

function clearInfoItems(gui){
    gui.removeComponent(infoStartId)
}

function createSettinsItems(gui){
    gui.addLabel(settingsStartId, "§lНастройки", settingsX + 110, 15 + settingsY, 50, 10)
    gui.addLabel(settingsStartId + 1, "§lПоложение по горизонтали:", settingsX + 20, 34 + settingsY, 190, 10)
    var horizont = gui.addTextField(settingsStartId + 2, settingsX+ 167, 33 + settingsY, 60, 10)
    gui.addLabel(settingsStartId + 3, "§lПоложение по вертикали:", adminX + 20, 49 + settingsY, 190, 10)
    var vertical = gui.addTextField(settingsStartId + 4, settingsX + 167, 48 + settingsY, 60, 10).setText(posY)
    horizont.setText(posX)
    horizont.setHoverText(["Положение меню по горизонтали", "Допустимый диапозон значений, от " + posXMin + " до " + posXMax + "", "По умлочанию: " + defaultX + ""]);
    vertical.setText(posY)
    vertical.setHoverText(["Положение меню по вертикали", "Допустимый диапозон значений, от " + posYMin + " до " + posYMax + "", "По умлочанию: " + defaultY + ""]);
    gui.addTexturedButton(settingsStartId + 5, "Применить", settingsX + 150, 160 + settingsY, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
    gui.addTexturedButton(settingsStartId + 6, "Сброс", settingsX + 20, 160 + settingsY, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
}

function clearSettinsItems(gui){
    var i = 0
    while(i < 7){
        gui.removeComponent(settingsStartId + i)
        i++
    }
}

function createAdminItems(gui){
    gui.addLabel(adminStartId, "§lИгрок:", adminX + 30, 14 + adminY, 90, 10)
    gui.addTextField(adminStartId + 1, adminX + 70, 13 + adminY, 40, 10)
    gui.addLabel(adminStartId + 2, "§lПричина:", adminX + 140, 14 + adminY, 90, 10)
    gui.addTextField(adminStartId + 3, adminX + 187, 13 + adminY, 40, 10)
    gui.getComponent(adminStartId + 3).setHoverText("Используеться только для комманд бана и кика");
    gui.addLabel(adminStartId + 4, "§lВремя:", adminX + 140, 29 + adminY, 90, 10)
    gui.addTextField(adminStartId + 5, adminX + 187, 29 + adminY, 40, 10)
    gui.getComponent(adminStartId + 5).setHoverText("Указывать только если команда этого требует");
    gui.addLabel(adminStartId + 6, "§lМнение:", adminX + 30, 29 + adminY, 90, 10)
    gui.addTextField(adminStartId + 7, adminX + 70, 29 + adminY, 40, 10)
    gui.getComponent(adminStartId + 7).setHoverText(["Сюда ты можешь записать свое личное мнение", "Потому, что оно все равно нигде не используеться", "§4т.к. твое хреновое мнение нахрен никому не сдалось"]);
    gui.addTexturedButton(adminStartId + 8, "ТП к игроку", adminX + 15, 45 + adminY, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
    gui.getComponent(adminStartId + 8).setHoverText("Телепортироваться к выбранному игроку");
    gui.addTexturedButton(adminStartId + 9, "ТП игрока к себе", adminX + 160, 45 + adminY, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
    gui.getComponent(adminStartId + 9).setHoverText("Телепортировать выбранного игрока к себе");
    gui.addTexturedButton(adminStartId + 10, "Бан", adminX + 15, 70 + adminY, 42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
    gui.getComponent(adminStartId + 10).setHoverText(["Забанить выбранного игрока", "по указанной причине"]);
    gui.addTexturedButton(adminStartId + 11, "Кик", adminX + 62, 70 + adminY, 42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
    gui.getComponent(adminStartId + 11).setHoverText(["Кикнуть выбранного игрока", "по указанной причине"]);
    gui.addTexturedButton(adminStartId + 12, "Бан IP", adminX + 160,70 + adminY, 42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
    gui.getComponent(adminStartId + 12).setHoverText(["Забанить по IP выбранного игрока", "по указанной причине"]);
    gui.addTexturedButton(adminStartId + 13, "Тюрьма", adminX + 207, 70 + adminY, 42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
    gui.getComponent(adminStartId + 13).setHoverText(["Посадить в тюрьму выбранного игрока"]);
    gui.addTexturedButton(adminStartId + 14, "Разбанить", adminX + 15, 95 + adminY, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
    gui.getComponent(adminStartId + 14).setHoverText(["Разбанить выбранного игрока"]);
    gui.addTexturedButton(adminStartId + 15, "Освободить", adminX + 160, 95 + adminY, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
    gui.getComponent(adminStartId + 15).setHoverText(["Освободить из тюрьмы выбранного игрока"]);
    gui.addTexturedButton(adminStartId + 16, "Инвентарь игрока", adminX + 15, 120 + adminY, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
    gui.getComponent(adminStartId + 16).setHoverText(["Открыть инвентарь выбранного игрока"]);
    gui.addTexturedButton(adminStartId + 17, "§4Убить игрока", adminX + 160, 120 + adminY, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
    gui.getComponent(adminStartId + 17).setHoverText(["§4Убить выбранного игрока"]);
    gui.addTexturedButton(adminStartId + 18, "Мут", adminX + 111, 45 + adminY,  42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
    gui.getComponent(adminStartId + 18).setHoverText(["Замутить выбранного игрока в минутах", "на указанное время по указанной причине", "Команда: /mute"]);
    gui.addTexturedButton(adminStartId + 19, "Тайм бан", adminX + 111, 70 + adminY,  42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
    gui.getComponent(adminStartId + 19).setHoverText(["Забанить на время выбранного игрока в минутах", "на указанное время по указанной причине", "Команда: /tempban"]);
    gui.addTexturedButton(adminStartId + 20, "Поджечь", adminX + 111, 95 + adminY,  42, 21, "customnpcs:textures/gui/osees.craft/gui/button_main3.png", 0, 0);
    gui.getComponent(adminStartId + 20).setHoverText(["Зажигает на время выбранного игрока в секундах", "Команда: /burn"]);
    gui.addTexturedButton(adminStartId + 21, "Очистить инвентарь", adminX + 15, 145 + adminY, 90, 21, "customnpcs:textures/gui/osees.craft/gui/button_main2.png", 0, 0);
    gui.getComponent(adminStartId + 21).setHoverText(["Очистить инвентарь выбранного игрока"]);
    gui.addTexturedButton(adminStartId + 22, "", adminX + 112, 12 + adminY, 10, 10, "customnpcs:textures/gui/osees.craft/gui/button2_plus.png", 0, 0);
    gui.addTexturedButton(adminStartId + 24, "", adminX + 229, 12 + adminY, 10, 10, "customnpcs:textures/gui/osees.craft/gui/button2_plus.png", 0, 0);
    gui.addTexturedButton(adminStartId + 26, "", adminX + 229, 28 + adminY, 10, 10, "customnpcs:textures/gui/osees.craft/gui/button2_plus.png", 0, 0);
    gui.addTexturedButton(adminStartId + 28, "", adminX + 112, 28 + adminY, 10, 10, "customnpcs:textures/gui/osees.craft/gui/button2_plus.png", 0, 0);
}

function clearAdminItems(gui){
    var i = 0
    while(i < 30){
        gui.removeComponent(adminStartId + i)
        i++
    }
}

function getPlayersName(event){
    var players = event.player.world.getAllPlayers()
    var playerNames = []
    for(var i in players){
        playerNames.push(players[i].getDisplayName())   
    }
    return playerNames
}

function updateConstants(){
    chapterX = 0 + posX
    chapterY = 0 + posY
    fastMenuX = 0 + posX
    fastMenuY = 0 + posY
    commandX = 40 + posX
    commandY = 30 + posY
    playerMenuX = 0 + posX
    playerMenuY = 0 + posY
    infoX = 0 + posX
    infoY = 0 + posY
    settingsX = 0 + posX
    settingsY = 0 + posY
    adminX = 0 + posX
    adminY = 0 + posY
}