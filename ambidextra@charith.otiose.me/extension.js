
const St = imports.gi.St;
const Main = imports.ui.main;
const Gio = imports.gi.Gio;

const GSETTINGS_KEY = "left-handed";

let settings = new Gio.Settings({ "schema" : "org.gnome.settings-daemon.peripherals.mouse" });
let button;


function _getMouseSetting(){
    return settings.get_boolean(GSETTINGS_KEY);
}

function _setMouseSetting(left_handed){
    settings.set_boolean(GSETTINGS_KEY,left_handed);
}

function _getLabel(left_handed){
    var text = left_handed ? "L" : "R";
    return new St.Label({ "text": text });
}    

function _toggleMouseSetting(){
    let currentStatus = _getMouseSetting();
    _setMouseSetting(!currentStatus);
           
    let label = _getLabel(!currentStatus);
    button.set_child(label);
}    

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });                          
    
   
   

    let label = _getLabel(_getMouseSetting());
    button.set_child(label);
    button.connect('button-press-event', _toggleMouseSetting);    
    button.add_style_class_name("my-panel-button");
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
