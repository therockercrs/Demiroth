//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.39;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.39] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x4cad34=_0x1143;(function(_0x2e9d01,_0x492357){const _0xa6631=_0x1143,_0x5e3a0e=_0x2e9d01();while(!![]){try{const _0x554ea4=parseInt(_0xa6631(0x5e6))/0x1*(parseInt(_0xa6631(0x430))/0x2)+parseInt(_0xa6631(0x19f))/0x3*(parseInt(_0xa6631(0x348))/0x4)+parseInt(_0xa6631(0x5d7))/0x5+-parseInt(_0xa6631(0x44b))/0x6+-parseInt(_0xa6631(0x56b))/0x7+parseInt(_0xa6631(0x546))/0x8+-parseInt(_0xa6631(0x2c9))/0x9*(parseInt(_0xa6631(0x32e))/0xa);if(_0x554ea4===_0x492357)break;else _0x5e3a0e['push'](_0x5e3a0e['shift']());}catch(_0x189bba){_0x5e3a0e['push'](_0x5e3a0e['shift']());}}}(_0xf778,0xe5534));var label=_0x4cad34(0x5b2),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0xa98ccf){const _0x38ccf1=_0x4cad34;return _0xa98ccf[_0x38ccf1(0x357)]&&_0xa98ccf[_0x38ccf1(0x4aa)][_0x38ccf1(0x165)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x4cad34(0x2f1)]||{},VisuMZ[_0x4cad34(0x54d)]=function(_0x346b7c,_0x2a1124){const _0x447071=_0x4cad34;for(const _0x395537 in _0x2a1124){if(_0x395537['match'](/(.*):(.*)/i)){const _0x444e3f=String(RegExp['$1']),_0x46cf89=String(RegExp['$2'])[_0x447071(0x5ca)]()['trim']();let _0x271664,_0x129f4f,_0x462d7a;switch(_0x46cf89){case'NUM':_0x271664=_0x2a1124[_0x395537]!==''?Number(_0x2a1124[_0x395537]):0x0;break;case _0x447071(0x440):_0x129f4f=_0x2a1124[_0x395537]!==''?JSON['parse'](_0x2a1124[_0x395537]):[],_0x271664=_0x129f4f[_0x447071(0x312)](_0x257f65=>Number(_0x257f65));break;case'EVAL':_0x271664=_0x2a1124[_0x395537]!==''?eval(_0x2a1124[_0x395537]):null;break;case _0x447071(0x134):_0x129f4f=_0x2a1124[_0x395537]!==''?JSON[_0x447071(0x265)](_0x2a1124[_0x395537]):[],_0x271664=_0x129f4f[_0x447071(0x312)](_0x77403f=>eval(_0x77403f));break;case _0x447071(0x587):_0x271664=_0x2a1124[_0x395537]!==''?JSON[_0x447071(0x265)](_0x2a1124[_0x395537]):'';break;case _0x447071(0x1f7):_0x129f4f=_0x2a1124[_0x395537]!==''?JSON[_0x447071(0x265)](_0x2a1124[_0x395537]):[],_0x271664=_0x129f4f[_0x447071(0x312)](_0x1f39c0=>JSON[_0x447071(0x265)](_0x1f39c0));break;case _0x447071(0x3e6):_0x271664=_0x2a1124[_0x395537]!==''?new Function(JSON[_0x447071(0x265)](_0x2a1124[_0x395537])):new Function('return\x200');break;case _0x447071(0x473):_0x129f4f=_0x2a1124[_0x395537]!==''?JSON[_0x447071(0x265)](_0x2a1124[_0x395537]):[],_0x271664=_0x129f4f[_0x447071(0x312)](_0x1d7d13=>new Function(JSON[_0x447071(0x265)](_0x1d7d13)));break;case _0x447071(0xf6):_0x271664=_0x2a1124[_0x395537]!==''?String(_0x2a1124[_0x395537]):'';break;case _0x447071(0x4b5):_0x129f4f=_0x2a1124[_0x395537]!==''?JSON[_0x447071(0x265)](_0x2a1124[_0x395537]):[],_0x271664=_0x129f4f['map'](_0x5561b4=>String(_0x5561b4));break;case _0x447071(0x5a5):_0x462d7a=_0x2a1124[_0x395537]!==''?JSON[_0x447071(0x265)](_0x2a1124[_0x395537]):{},_0x346b7c[_0x444e3f]={},VisuMZ[_0x447071(0x54d)](_0x346b7c[_0x444e3f],_0x462d7a);continue;case _0x447071(0x3f1):_0x129f4f=_0x2a1124[_0x395537]!==''?JSON['parse'](_0x2a1124[_0x395537]):[],_0x271664=_0x129f4f[_0x447071(0x312)](_0x3440be=>VisuMZ[_0x447071(0x54d)]({},JSON[_0x447071(0x265)](_0x3440be)));break;default:continue;}_0x346b7c[_0x444e3f]=_0x271664;}}return _0x346b7c;},(_0xe07edd=>{const _0x3880cf=_0x4cad34,_0x5e3f88=_0xe07edd['name'];for(const _0x2941a1 of dependencies){if(!Imported[_0x2941a1]){alert(_0x3880cf(0x525)[_0x3880cf(0x417)](_0x5e3f88,_0x2941a1)),SceneManager[_0x3880cf(0x5ed)]();break;}}const _0x30645d=_0xe07edd[_0x3880cf(0x4aa)];if(_0x30645d[_0x3880cf(0x12a)](/\[Version[ ](.*?)\]/i)){const _0x24fa5d=Number(RegExp['$1']);if(_0x24fa5d!==VisuMZ[label][_0x3880cf(0x27d)]){if(_0x3880cf(0x39b)!==_0x3880cf(0x39b)){const _0x2e1503=_0x53de91['getSelfTarget']()||this;if(_0x2e1503[_0x3880cf(0x35d)]!==_0x546e5c)_0x41bc1e[_0x3880cf(0x5b2)][_0x3880cf(0x500)]['call'](this,_0x172590,_0x1d674d);else{const _0x14f13c=[_0x2e1503['_mapId'],_0x2e1503[_0x3880cf(0x1a9)],_0x3880cf(0x503)['format'](_0x374f5f)];_0x54a2d0[_0x3880cf(0x51a)](_0x14f13c,_0x17cd68);}}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3880cf(0x417)](_0x5e3f88,_0x24fa5d)),SceneManager['exit']();}}if(_0x30645d['match'](/\[Tier[ ](\d+)\]/i)){const _0x447b43=Number(RegExp['$1']);_0x447b43<tier?(alert(_0x3880cf(0x4f3)['format'](_0x5e3f88,_0x447b43,tier)),SceneManager[_0x3880cf(0x5ed)]()):tier=Math[_0x3880cf(0x59d)](_0x447b43,tier);}VisuMZ[_0x3880cf(0x54d)](VisuMZ[label]['Settings'],_0xe07edd[_0x3880cf(0x243)]);})(pluginData),VisuMZ[_0x4cad34(0x4b4)]=function(_0x259484,_0x5b934,_0x5d904f){switch(_0x5d904f){case'=':return _0x5b934;break;case'+':return _0x259484+_0x5b934;break;case'-':return _0x259484-_0x5b934;break;case'*':return _0x259484*_0x5b934;break;case'/':return _0x259484/_0x5b934;break;case'%':return _0x259484%_0x5b934;break;}return _0x259484;},PluginManager['registerCommand'](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x386),_0x3449ef=>{const _0x56caea=_0x4cad34;VisuMZ[_0x56caea(0x54d)](_0x3449ef,_0x3449ef);switch(_0x3449ef[_0x56caea(0x5c8)]){case _0x56caea(0x5f2):$gameSystem[_0x56caea(0x45c)](!![]);break;case _0x56caea(0x300):$gameSystem[_0x56caea(0x45c)](![]);break;case _0x56caea(0x5f4):$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x56caea(0x573)]());break;}}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x569),_0x1a1582=>{const _0x237a0c=_0x4cad34;VisuMZ[_0x237a0c(0x54d)](_0x1a1582,_0x1a1582);const _0x4dd5fb=$gameTemp[_0x237a0c(0x4d7)](),_0x56e634={'mapId':_0x1a1582[_0x237a0c(0xfe)],'eventId':_0x1a1582[_0x237a0c(0x494)]||_0x4dd5fb[_0x237a0c(0x477)](),'pageId':_0x1a1582['PageId']};if(_0x56e634[_0x237a0c(0x574)]<=0x0)_0x56e634[_0x237a0c(0x574)]=$gameMap?$gameMap[_0x237a0c(0x574)]():0x1;$gameTemp[_0x237a0c(0x4d7)]()['pluginCommandCallEvent'](_0x56e634);}),PluginManager['registerCommand'](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x4ef),_0x9f1a9e=>{const _0xb283df=_0x4cad34;VisuMZ[_0xb283df(0x54d)](_0x9f1a9e,_0x9f1a9e);switch(_0x9f1a9e['Value']){case'Enable':$gameSystem[_0xb283df(0x3a6)](!![]);break;case _0xb283df(0x3b6):$gameSystem[_0xb283df(0x3a6)](![]);break;case _0xb283df(0x5f4):$gameSystem['setDashingEnabled'](!$gameSystem[_0xb283df(0x5ad)]());break;}}),PluginManager['registerCommand'](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x3ec),_0x2af499=>{const _0x37f45=_0x4cad34;VisuMZ[_0x37f45(0x54d)](_0x2af499,_0x2af499);const _0x279005=$gameTemp[_0x37f45(0x4d7)]();_0x2af499[_0x37f45(0xfe)]=_0x2af499['MapId']||$gameMap['mapId'](),$gameSystem[_0x37f45(0x57b)](_0x2af499[_0x37f45(0xfe)],_0x2af499['EventId']||_0x279005[_0x37f45(0x477)](),_0x2af499['IconIndex'],_0x2af499[_0x37f45(0x464)],_0x2af499['IconBufferY'],_0x2af499['IconBlendMode']);}),PluginManager[_0x4cad34(0xfd)](pluginData['name'],_0x4cad34(0x5ae),_0x1a8a4a=>{const _0x550b50=_0x4cad34;VisuMZ[_0x550b50(0x54d)](_0x1a8a4a,_0x1a8a4a);const _0x3695e0=$gameTemp[_0x550b50(0x4d7)]();_0x1a8a4a[_0x550b50(0xfe)]=_0x1a8a4a[_0x550b50(0xfe)]||$gameMap[_0x550b50(0x574)](),$gameSystem[_0x550b50(0x508)](_0x1a8a4a[_0x550b50(0xfe)],_0x1a8a4a['EventId']||_0x3695e0[_0x550b50(0x477)]());}),PluginManager[_0x4cad34(0xfd)](pluginData['name'],_0x4cad34(0x102),_0x5c0997=>{const _0x39c610=_0x4cad34;if($gameMap)for(const _0x27328b of $gameMap[_0x39c610(0x303)]()){_0x27328b[_0x39c610(0x4d9)]();}}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x331),_0x4d6daa=>{const _0x8de5ad=_0x4cad34;VisuMZ[_0x8de5ad(0x54d)](_0x4d6daa,_0x4d6daa);switch(_0x4d6daa[_0x8de5ad(0x111)]){case _0x8de5ad(0x56c):$gameSystem['setEventLabelsVisible'](!![]);break;case'Hidden':$gameSystem['setEventLabelsVisible'](![]);break;case _0x8de5ad(0x5f4):$gameSystem[_0x8de5ad(0x5b5)](!$gameSystem['eventLabelsVisible']());break;}}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x48f),_0x21cce9=>{const _0x2bc998=_0x4cad34;VisuMZ[_0x2bc998(0x54d)](_0x21cce9,_0x21cce9);const _0xe9720c=$gameTemp[_0x2bc998(0x4d7)]();if(!$gameMap)return;const _0x370342=$gameMap[_0x2bc998(0x199)](_0x21cce9['EventId']||_0xe9720c['eventId']());if(_0x370342)_0x370342[_0x2bc998(0x51b)]();}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],'EventLocationCreate',_0x3f78d0=>{const _0x5d1189=_0x4cad34;VisuMZ['ConvertParams'](_0x3f78d0,_0x3f78d0);const _0x27017c=$gameTemp['getLastPluginCommandInterpreter'](),_0x4352c4=_0x3f78d0[_0x5d1189(0xfe)]||$gameMap[_0x5d1189(0x574)](),_0xb19265=_0x3f78d0[_0x5d1189(0x494)]||_0x27017c['eventId'](),_0x50a94d=_0x3f78d0['PosX']||0x0,_0x20c226=_0x3f78d0[_0x5d1189(0x2a0)]||0x0,_0x3c08fe=_0x3f78d0[_0x5d1189(0x271)]||0x2,_0x32ac99=((_0x3f78d0[_0x5d1189(0x52e)]||0x1)-0x1)[_0x5d1189(0x229)](0x0,0x13),_0x94d446=_0x3f78d0[_0x5d1189(0x35b)]||0x0;$gameSystem[_0x5d1189(0x33e)](_0x4352c4,_0xb19265,_0x50a94d,_0x20c226,_0x3c08fe,_0x32ac99,_0x94d446);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x483),_0x23e309=>{const _0x49e78d=_0x4cad34;VisuMZ[_0x49e78d(0x54d)](_0x23e309,_0x23e309);const _0x44b247=$gameTemp[_0x49e78d(0x4d7)](),_0xcd581e=_0x23e309[_0x49e78d(0xfe)]||$gameMap[_0x49e78d(0x574)](),_0x4df9e4=_0x23e309[_0x49e78d(0x494)]||_0x44b247['eventId']();$gameSystem[_0x49e78d(0x43e)](_0xcd581e,_0x4df9e4);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x286),_0x53275d=>{const _0x5930ae=_0x4cad34;VisuMZ['ConvertParams'](_0x53275d,_0x53275d);const _0x23a9f2=_0x53275d[_0x5930ae(0x1d4)];$gameTimer[_0x5930ae(0x36a)](_0x23a9f2);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x200),_0x3c006d=>{const _0x3f9a6b=_0x4cad34;$gameTimer[_0x3f9a6b(0x36a)](0x0);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x488),_0x3dd6ce=>{const _0x520dd6=_0x4cad34;if(!$gameTimer[_0x520dd6(0x4e4)]())return;VisuMZ['ConvertParams'](_0x3dd6ce,_0x3dd6ce);let _0x1668bc=0x0;_0x1668bc+=_0x3dd6ce[_0x520dd6(0x19a)],_0x1668bc+=_0x3dd6ce['Seconds']*0x3c,_0x1668bc+=_0x3dd6ce[_0x520dd6(0x295)]*0x3c*0x3c,_0x1668bc+=_0x3dd6ce['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x520dd6(0x275)](_0x1668bc);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x4c4),_0x31deeb=>{const _0x1e65de=_0x4cad34;if(!$gameTimer['isWorking']())return;VisuMZ['ConvertParams'](_0x31deeb,_0x31deeb);let _0x1843b0=0x0;_0x1843b0+=_0x31deeb['Frames'],_0x1843b0+=_0x31deeb[_0x1e65de(0x13d)]*0x3c,_0x1843b0+=_0x31deeb[_0x1e65de(0x295)]*0x3c*0x3c,_0x1843b0+=_0x31deeb[_0x1e65de(0x51d)]*0x3c*0x3c*0x3c,$gameTimer[_0x1e65de(0x1e5)](_0x1843b0);}),PluginManager[_0x4cad34(0xfd)](pluginData['name'],'EventTimerPause',_0x495133=>{const _0xf15e4f=_0x4cad34;if(!$gameTimer[_0xf15e4f(0x4e4)]())return;$gameTimer['pause']();}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],'EventTimerResume',_0xc9e982=>{const _0x5463f2=_0x4cad34;if(!$gameTimer['isWorking']())return;$gameTimer[_0x5463f2(0x2ae)]();}),PluginManager[_0x4cad34(0xfd)](pluginData['name'],_0x4cad34(0x4ed),_0x3272ab=>{const _0xcceb81=_0x4cad34;VisuMZ[_0xcceb81(0x54d)](_0x3272ab,_0x3272ab);const _0x1f1b3a=_0x3272ab['Speed']||0x0;$gameTimer[_0xcceb81(0x5e2)](_0x1f1b3a);}),PluginManager['registerCommand'](pluginData[_0x4cad34(0x4ec)],'FollowerSetGlobalChase',_0x2a924e=>{const _0x426344=_0x4cad34;VisuMZ[_0x426344(0x54d)](_0x2a924e,_0x2a924e);const _0x1fa9a5=!_0x2a924e['Chase'];$gameSystem[_0x426344(0x1e0)](_0x1fa9a5);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x38c),_0x3ad0fa=>{const _0x2dd676=_0x4cad34;VisuMZ['ConvertParams'](_0x3ad0fa,_0x3ad0fa);const _0x1d0246=(_0x3ad0fa[_0x2dd676(0x1ce)]||0x0)-0x1,_0x3b300a=!_0x3ad0fa[_0x2dd676(0x50c)],_0x19e381=$gamePlayer[_0x2dd676(0x28a)]()[_0x2dd676(0x3ca)](_0x1d0246);if(_0x19e381)_0x19e381[_0x2dd676(0x45b)](_0x3b300a);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],'FollowerSetControl',_0x27bf73=>{const _0x52a606=_0x4cad34;VisuMZ[_0x52a606(0x54d)](_0x27bf73,_0x27bf73);const _0x5273ca=_0x27bf73['FollowerID'];$gameSystem[_0x52a606(0x497)](_0x5273ca);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x3df),_0x3a72f6=>{const _0x4bad76=_0x4cad34;VisuMZ[_0x4bad76(0x54d)](_0x3a72f6,_0x3a72f6),$gameSystem[_0x4bad76(0x497)](0x0),$gameSystem[_0x4bad76(0x1e0)](![]);for(const _0x1e43d5 of $gamePlayer[_0x4bad76(0x28a)]()[_0x4bad76(0x57d)]){if(_0x4bad76(0x268)!==_0x4bad76(0x20b)){if(_0x1e43d5)_0x1e43d5['setChaseOff'](![]);}else _0x4bdaf8[_0x4bad76(0x51a)](_0x4971b4,!!_0x14fbfb);}}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x366),_0x14f50e=>{const _0x2c1c62=_0x4cad34;VisuMZ[_0x2c1c62(0x54d)](_0x14f50e,_0x14f50e);const _0x114eb1=$gameTemp[_0x2c1c62(0x4d7)]();_0x14f50e[_0x2c1c62(0xfe)]=_0x14f50e[_0x2c1c62(0xfe)]||$gameMap[_0x2c1c62(0x574)]();const _0x222b17=[_0x14f50e['MapId'],_0x14f50e[_0x2c1c62(0x494)]||_0x114eb1['eventId'](),_0x14f50e[_0x2c1c62(0x590)]],_0x5e1e18=_0x14f50e[_0x2c1c62(0x26c)],_0x235eaa=$gameSelfSwitches[_0x2c1c62(0x49f)](_0x222b17)||![];$gameSwitches[_0x2c1c62(0x51a)](_0x5e1e18,_0x235eaa);}),PluginManager[_0x4cad34(0xfd)](pluginData['name'],_0x4cad34(0x504),_0x1af268=>{const _0xd75a1e=_0x4cad34;VisuMZ[_0xd75a1e(0x54d)](_0x1af268,_0x1af268);const _0x2d8bef=$gameTemp[_0xd75a1e(0x4d7)]();_0x1af268[_0xd75a1e(0xfe)]=_0x1af268[_0xd75a1e(0xfe)]||$gameMap[_0xd75a1e(0x574)]();const _0x39dc9e=[_0x1af268[_0xd75a1e(0xfe)],_0x1af268[_0xd75a1e(0x494)]||_0x2d8bef['eventId'](),_0xd75a1e(0x5f0)[_0xd75a1e(0x417)](_0x1af268[_0xd75a1e(0x1df)])],_0x504db0=_0x1af268[_0xd75a1e(0x26c)],_0x15c890=$gameSelfSwitches[_0xd75a1e(0x49f)](_0x39dc9e)||![];$gameSwitches[_0xd75a1e(0x51a)](_0x504db0,_0x15c890);}),PluginManager[_0x4cad34(0xfd)](pluginData['name'],_0x4cad34(0x10d),_0x3d53db=>{const _0x1ac614=_0x4cad34;VisuMZ[_0x1ac614(0x54d)](_0x3d53db,_0x3d53db);const _0x49e893=$gameTemp[_0x1ac614(0x4d7)]();_0x3d53db[_0x1ac614(0xfe)]=_0x3d53db['MapId']||$gameMap[_0x1ac614(0x574)]();const _0x46b55e=[_0x3d53db['MapId'],_0x3d53db['EventId']||_0x49e893['eventId'](),'Self\x20Variable\x20%1'[_0x1ac614(0x417)](_0x3d53db[_0x1ac614(0x23f)])],_0x1df189=_0x3d53db[_0x1ac614(0x32b)],_0x1439a6=$gameSelfSwitches[_0x1ac614(0x49f)](_0x46b55e)||![];$gameVariables['setValue'](_0x1df189,_0x1439a6);}),PluginManager['registerCommand'](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x542),_0x1e6503=>{const _0xd5e1c6=_0x4cad34;VisuMZ[_0xd5e1c6(0x54d)](_0x1e6503,_0x1e6503);if(!$gameMap)return;const _0x5612f0=$gameTemp[_0xd5e1c6(0x4d7)](),_0x3afa3a=_0x1e6503[_0xd5e1c6(0x526)];_0x1e6503[_0xd5e1c6(0x2fa)]=_0x1e6503['Step1MapId']||$gameMap[_0xd5e1c6(0x574)](),_0x1e6503['Step2MapId']=_0x1e6503[_0xd5e1c6(0x230)]||$gameMap[_0xd5e1c6(0x574)](),_0x1e6503[_0xd5e1c6(0x4c9)]=_0x1e6503[_0xd5e1c6(0x4c9)][_0xd5e1c6(0x5ca)]()[_0xd5e1c6(0x2c6)]();if(!_0x3afa3a&&_0x1e6503[_0xd5e1c6(0x2fa)]!==$gameMap[_0xd5e1c6(0x574)]())return;if($gameMap['mapId']()===_0x1e6503['Step1MapId']){if(_0xd5e1c6(0x2bd)!==_0xd5e1c6(0x5cf)){const _0x129544=$gameMap['event'](_0x1e6503[_0xd5e1c6(0x2d1)]||_0x5612f0[_0xd5e1c6(0x477)]());if(!_0x129544)return;_0x1e6503['TemplateName']!==_0xd5e1c6(0x1bd)?_0x129544[_0xd5e1c6(0x3f2)](_0x1e6503[_0xd5e1c6(0x4c9)]):_0x129544[_0xd5e1c6(0x380)](_0x1e6503[_0xd5e1c6(0x230)],_0x1e6503[_0xd5e1c6(0x16a)]||_0x5612f0[_0xd5e1c6(0x477)]());}else{const _0x2c1d72=_0x148a0d[_0xd5e1c6(0x3b3)],_0x5b2492=_0x56583c[_0xd5e1c6(0x2de)],_0x53d775=_0x67194%0x10*_0x2c1d72,_0x243cea=_0x569739[_0xd5e1c6(0x53f)](_0x2ba485/0x10)*_0x5b2492;_0x10f116[_0xd5e1c6(0x552)](_0x53d775,_0x243cea,_0x2c1d72,_0x5b2492),this[_0xd5e1c6(0x3b1)]=!![];}}_0x3afa3a&&$gameSystem[_0xd5e1c6(0x352)](_0x1e6503[_0xd5e1c6(0x2fa)],_0x1e6503[_0xd5e1c6(0x2d1)],_0x1e6503['TemplateName'],_0x1e6503[_0xd5e1c6(0x230)],_0x1e6503[_0xd5e1c6(0x16a)]);}),PluginManager[_0x4cad34(0xfd)](pluginData['name'],_0x4cad34(0x22c),_0x419db0=>{const _0xc95e6f=_0x4cad34;VisuMZ[_0xc95e6f(0x54d)](_0x419db0,_0x419db0);if(!$gameMap)return;const _0x134a37=$gameTemp[_0xc95e6f(0x4d7)]();_0x419db0[_0xc95e6f(0xfe)]=_0x419db0[_0xc95e6f(0xfe)]||$gameMap[_0xc95e6f(0x574)]();if($gameMap['mapId']()===_0x419db0[_0xc95e6f(0xfe)]){if(_0xc95e6f(0x474)===_0xc95e6f(0x193)){const _0x3f2cb7=_0x536325[_0xc95e6f(0x33a)](this[_0xc95e6f(0x349)]());if(_0x3f2cb7){const _0x5b1cae=_0x35bc44[_0xc95e6f(0x4ee)](this[_0xc95e6f(0x577)],this[_0xc95e6f(0x32f)],_0x3f2cb7[_0xc95e6f(0x577)],_0x3f2cb7[_0xc95e6f(0x32f)])-0x1,_0x24e91c=_0x44e9e7[_0xc95e6f(0x2e1)](_0x15cf40['tileWidth'](),_0x3cf6a9[_0xc95e6f(0x5d5)]()),_0x3fe2f6=this[_0xc95e6f(0x2d7)][_0xc95e6f(0x38e)]||0x0;_0x816947-=_0x28cf8b[_0xc95e6f(0x59d)](0x0,_0x5b1cae)*_0x24e91c*_0x3fe2f6;}}else{const _0x33de68=$gameMap[_0xc95e6f(0x199)](_0x419db0[_0xc95e6f(0x494)]||_0x134a37[_0xc95e6f(0x477)]());_0x33de68['removeMorph']();}}_0x419db0[_0xc95e6f(0x531)]&&$gameSystem[_0xc95e6f(0x347)](_0x419db0[_0xc95e6f(0xfe)],_0x419db0['EventId']||_0x134a37[_0xc95e6f(0x477)]());}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x37c),_0x217160=>{const _0x5abfc5=_0x4cad34;VisuMZ['ConvertParams'](_0x217160,_0x217160),$gameSystem['setPlayerControlDisable'](!_0x217160[_0x5abfc5(0x176)]);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x1b8),_0x37c237=>{const _0x49a045=_0x4cad34;VisuMZ[_0x49a045(0x54d)](_0x37c237,_0x37c237),$gameSystem[_0x49a045(0x1a6)](_0x37c237[_0x49a045(0x13f)]);}),PluginManager['registerCommand'](pluginData['name'],_0x4cad34(0x2d5),_0x51ec55=>{const _0x32167a=_0x4cad34;VisuMZ[_0x32167a(0x54d)](_0x51ec55,_0x51ec55),$gameSystem[_0x32167a(0x562)]($gamePlayer,_0x51ec55[_0x32167a(0x157)],_0x51ec55[_0x32167a(0x464)],_0x51ec55[_0x32167a(0x34b)],_0x51ec55[_0x32167a(0x2f2)]);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x164),_0x1c091b=>{const _0x4fa26e=_0x4cad34;VisuMZ[_0x4fa26e(0x54d)](_0x1c091b,_0x1c091b),$gameSystem[_0x4fa26e(0x217)]($gamePlayer);}),PluginManager[_0x4cad34(0xfd)](pluginData['name'],_0x4cad34(0x36c),_0x1a1f2a=>{const _0xaf5262=_0x4cad34;VisuMZ[_0xaf5262(0x54d)](_0x1a1f2a,_0x1a1f2a);const _0x1bf9eb=$gameTemp[_0xaf5262(0x4d7)]();_0x1a1f2a[_0xaf5262(0xfe)]=_0x1a1f2a[_0xaf5262(0xfe)]||$gameMap['mapId']();const _0x2a56d5=[_0x1a1f2a[_0xaf5262(0xfe)],_0x1a1f2a[_0xaf5262(0x494)]||_0x1bf9eb[_0xaf5262(0x477)](),_0x1a1f2a[_0xaf5262(0x590)]];switch(_0x1a1f2a[_0xaf5262(0x5c8)]){case'ON':$gameSelfSwitches[_0xaf5262(0x51a)](_0x2a56d5,!![]);break;case _0xaf5262(0x298):$gameSelfSwitches[_0xaf5262(0x51a)](_0x2a56d5,![]);break;case _0xaf5262(0x5f4):$gameSelfSwitches[_0xaf5262(0x51a)](_0x2a56d5,!$gameSelfSwitches['value'](_0x2a56d5));break;}}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x2f7),_0x2b553e=>{const _0x3915ec=_0x4cad34;VisuMZ[_0x3915ec(0x54d)](_0x2b553e,_0x2b553e);const _0x46f0cd=$gameTemp[_0x3915ec(0x4d7)]();_0x2b553e[_0x3915ec(0xfe)]=_0x2b553e[_0x3915ec(0xfe)]||$gameMap[_0x3915ec(0x574)]();const _0x367b8d=[_0x2b553e[_0x3915ec(0xfe)],_0x2b553e[_0x3915ec(0x494)]||_0x46f0cd['eventId'](),_0x3915ec(0x5f0)[_0x3915ec(0x417)](_0x2b553e[_0x3915ec(0x1df)])];switch(_0x2b553e[_0x3915ec(0x5c8)]){case'ON':$gameSelfSwitches[_0x3915ec(0x51a)](_0x367b8d,!![]);break;case _0x3915ec(0x298):$gameSelfSwitches[_0x3915ec(0x51a)](_0x367b8d,![]);break;case _0x3915ec(0x5f4):$gameSelfSwitches[_0x3915ec(0x51a)](_0x367b8d,!$gameSelfSwitches[_0x3915ec(0x49f)](_0x367b8d));break;}}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x379),_0x313c5e=>{const _0xb9e69c=_0x4cad34;VisuMZ[_0xb9e69c(0x54d)](_0x313c5e,_0x313c5e);const _0x494c23=$gameTemp[_0xb9e69c(0x4d7)]();_0x313c5e['MapId']=_0x313c5e['MapId']||$gameMap[_0xb9e69c(0x574)]();const _0x27b6f7=[_0x313c5e[_0xb9e69c(0xfe)],_0x313c5e['EventId']||_0x494c23[_0xb9e69c(0x477)](),_0xb9e69c(0x503)[_0xb9e69c(0x417)](_0x313c5e[_0xb9e69c(0x23f)])],_0x4d1f84=VisuMZ[_0xb9e69c(0x4b4)]($gameSelfSwitches[_0xb9e69c(0x49f)](_0x27b6f7),_0x313c5e['Value'],_0x313c5e[_0xb9e69c(0x3ac)]);$gameSelfSwitches[_0xb9e69c(0x51a)](_0x27b6f7,_0x4d1f84);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],'SpawnEventAtXY',_0x3517aa=>{const _0x58e41e=_0x4cad34;VisuMZ[_0x58e41e(0x54d)](_0x3517aa,_0x3517aa);const _0x2f2859=$gameTemp['getLastPluginCommandInterpreter'](),_0x5157da={'template':_0x3517aa[_0x58e41e(0x4c9)],'mapId':_0x3517aa[_0x58e41e(0xfe)]||$gameMap[_0x58e41e(0x574)](),'eventId':_0x3517aa[_0x58e41e(0x494)]||_0x2f2859[_0x58e41e(0x477)](),'x':_0x3517aa[_0x58e41e(0x228)],'y':_0x3517aa[_0x58e41e(0x2a0)],'spawnPreserved':_0x3517aa[_0x58e41e(0x101)],'spawnEventId':$gameMap['_spawnedEvents'][_0x58e41e(0x207)]+0x3e8},_0x4e02b1=_0x3517aa[_0x58e41e(0x1a1)]||0x0;if(!VisuMZ[_0x58e41e(0x262)][_0x5157da[_0x58e41e(0x574)]]&&_0x5157da[_0x58e41e(0x574)]!==$gameMap[_0x58e41e(0x574)]()){let _0x4799ff=_0x58e41e(0x4bb)[_0x58e41e(0x417)](_0x5157da[_0x58e41e(0x574)]);_0x4799ff+=_0x58e41e(0x328),_0x4799ff+=_0x58e41e(0x2e2),_0x4799ff+=_0x58e41e(0x18f),_0x4799ff+=_0x58e41e(0x42c)[_0x58e41e(0x417)](_0x5157da[_0x58e41e(0x574)]),alert(_0x4799ff);return;}const _0xcd5692=$gameMap['prepareSpawnedEventAtXY'](_0x5157da,_0x3517aa[_0x58e41e(0x1ca)],_0x3517aa[_0x58e41e(0x319)]);if(_0x4e02b1){if(_0x58e41e(0x40c)==='jHztk')$gameSwitches[_0x58e41e(0x51a)](_0x4e02b1,!!_0xcd5692);else return this[_0x58e41e(0x592)](_0x2eb75d(_0x23f674['$1']));}}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x13b),_0x4f2a07=>{const _0x5e86ef=_0x4cad34;VisuMZ[_0x5e86ef(0x54d)](_0x4f2a07,_0x4f2a07);const _0x2de511=$gameTemp[_0x5e86ef(0x4d7)](),_0x1d5f90={'template':_0x4f2a07[_0x5e86ef(0x4c9)],'mapId':_0x4f2a07[_0x5e86ef(0xfe)]||$gameMap['mapId'](),'eventId':_0x4f2a07[_0x5e86ef(0x494)]||_0x2de511[_0x5e86ef(0x477)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x4f2a07['Preserve'],'spawnEventId':$gameMap['_spawnedEvents'][_0x5e86ef(0x207)]+0x3e8},_0x32b4bb=_0x4f2a07[_0x5e86ef(0x1a1)]||0x0;if(!VisuMZ[_0x5e86ef(0x262)][_0x1d5f90[_0x5e86ef(0x574)]]&&_0x1d5f90[_0x5e86ef(0x574)]!==$gameMap[_0x5e86ef(0x574)]()){if(_0x5e86ef(0x2df)==='Bvydh')this[_0x5e86ef(0x572)]=new _0x6d2dfb(_0x4128c1['round'](_0x3c432c['boxWidth']/0x2),0x30),this['bitmap'][_0x5e86ef(0x596)]=this[_0x5e86ef(0x596)](),this['bitmap'][_0x5e86ef(0x56e)]=this[_0x5e86ef(0x56e)](),this[_0x5e86ef(0x572)][_0x5e86ef(0x520)]=_0xf9f57[_0x5e86ef(0x520)]();else{let _0x225b4a=_0x5e86ef(0x4bb)[_0x5e86ef(0x417)](_0x1d5f90[_0x5e86ef(0x574)]);_0x225b4a+=_0x5e86ef(0x328),_0x225b4a+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x225b4a+=_0x5e86ef(0x18f),_0x225b4a+=_0x5e86ef(0x42c)[_0x5e86ef(0x417)](_0x1d5f90[_0x5e86ef(0x574)]),alert(_0x225b4a);return;}}const _0x2e7d00=$gameMap['prepareSpawnedEventAtRegion'](_0x1d5f90,_0x4f2a07['Region'],_0x4f2a07['Collision'],_0x4f2a07[_0x5e86ef(0x319)]);_0x32b4bb&&$gameSwitches[_0x5e86ef(0x51a)](_0x32b4bb,!!_0x2e7d00);}),PluginManager['registerCommand'](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x3d2),_0x3a18b7=>{const _0x5152e3=_0x4cad34;VisuMZ[_0x5152e3(0x54d)](_0x3a18b7,_0x3a18b7);const _0x2349da=$gameTemp['getLastPluginCommandInterpreter'](),_0x458f30={'template':_0x3a18b7[_0x5152e3(0x4c9)],'mapId':_0x3a18b7[_0x5152e3(0xfe)]||$gameMap[_0x5152e3(0x574)](),'eventId':_0x3a18b7['EventId']||_0x2349da[_0x5152e3(0x477)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x3a18b7['Preserve'],'spawnEventId':$gameMap[_0x5152e3(0x23d)][_0x5152e3(0x207)]+0x3e8},_0x211807=_0x3a18b7['SuccessSwitchId']||0x0;if(!VisuMZ[_0x5152e3(0x262)][_0x458f30[_0x5152e3(0x574)]]&&_0x458f30['mapId']!==$gameMap[_0x5152e3(0x574)]()){if(_0x5152e3(0x335)===_0x5152e3(0x335)){let _0x30ddab=_0x5152e3(0x4bb)[_0x5152e3(0x417)](_0x458f30[_0x5152e3(0x574)]);_0x30ddab+=_0x5152e3(0x328),_0x30ddab+=_0x5152e3(0x2e2),_0x30ddab+=_0x5152e3(0x18f),_0x30ddab+=_0x5152e3(0x42c)[_0x5152e3(0x417)](_0x458f30[_0x5152e3(0x574)]),alert(_0x30ddab);return;}else{if(this[_0x5152e3(0x3a1)])return!![];return _0x1a6808[_0x5152e3(0x5b2)][_0x5152e3(0x50e)][_0x5152e3(0x24b)](this);}}const _0x30de98=$gameMap[_0x5152e3(0x1fc)](_0x458f30,_0x3a18b7[_0x5152e3(0x305)],_0x3a18b7[_0x5152e3(0x1ca)],_0x3a18b7[_0x5152e3(0x319)]);_0x211807&&(_0x5152e3(0x3b4)==='CDSAe'?(_0x6ec236[_0x5152e3(0x3a4)][_0x5152e3(0x3ee)][_0x5152e3(0x24b)](this),this['updateText'](),this['updateScale'](),this[_0x5152e3(0x37b)](),this[_0x5152e3(0x4bd)]()):$gameSwitches[_0x5152e3(0x51a)](_0x211807,!!_0x30de98));}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],'SpawnEventDespawnEventID',_0x267da4=>{const _0x29f1b3=_0x4cad34;VisuMZ['ConvertParams'](_0x267da4,_0x267da4);const _0x262d3f=$gameTemp[_0x29f1b3(0x4d7)]();$gameMap['despawnEventId'](_0x267da4[_0x29f1b3(0x1e8)]||_0x262d3f[_0x29f1b3(0x477)]());}),PluginManager[_0x4cad34(0xfd)](pluginData['name'],_0x4cad34(0x294),_0x40c579=>{const _0x15d747=_0x4cad34;VisuMZ[_0x15d747(0x54d)](_0x40c579,_0x40c579);const _0x1d7f14=_0x40c579['PosX'],_0x292fc5=_0x40c579[_0x15d747(0x2a0)];$gameMap[_0x15d747(0x570)](_0x1d7f14,_0x292fc5);}),PluginManager['registerCommand'](pluginData[_0x4cad34(0x4ec)],_0x4cad34(0x4a3),_0x2e335a=>{const _0x546dc3=_0x4cad34;VisuMZ['ConvertParams'](_0x2e335a,_0x2e335a),$gameMap[_0x546dc3(0x458)](_0x2e335a['Region']);}),PluginManager[_0x4cad34(0xfd)](pluginData['name'],'SpawnEventDespawnTerrainTags',_0x2baab8=>{const _0x4a8540=_0x4cad34;VisuMZ[_0x4a8540(0x54d)](_0x2baab8,_0x2baab8),$gameMap[_0x4a8540(0x563)](_0x2baab8[_0x4a8540(0x305)]);}),PluginManager[_0x4cad34(0xfd)](pluginData[_0x4cad34(0x4ec)],'SpawnEventDespawnEverything',_0xb2fc38=>{const _0x3e0287=_0x4cad34;VisuMZ[_0x3e0287(0x54d)](_0xb2fc38,_0xb2fc38),$gameMap[_0x3e0287(0x5c9)]();}),VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x377)]=Scene_Boot[_0x4cad34(0x3a4)][_0x4cad34(0x146)],Scene_Boot[_0x4cad34(0x3a4)]['onDatabaseLoaded']=function(){const _0xf01cd0=_0x4cad34;VisuMZ[_0xf01cd0(0x5b2)][_0xf01cd0(0x377)][_0xf01cd0(0x24b)](this),this[_0xf01cd0(0x478)](),this[_0xf01cd0(0x125)]();if(VisuMZ[_0xf01cd0(0x5b2)][_0xf01cd0(0x238)])VisuMZ[_0xf01cd0(0x5b2)]['CustomPageConditions'][_0xf01cd0(0x532)]();},VisuMZ[_0x4cad34(0x262)]=[],VisuMZ[_0x4cad34(0x389)]={},Scene_Boot[_0x4cad34(0x3a4)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x8f1bc8=_0x4cad34;if(DataManager[_0x8f1bc8(0x450)]()||DataManager[_0x8f1bc8(0x47c)]())return;const _0x23005b=VisuMZ[_0x8f1bc8(0x5b2)][_0x8f1bc8(0x2f1)][_0x8f1bc8(0x3f4)],_0x4772b5=_0x23005b[_0x8f1bc8(0x4db)]['slice'](0x0);for(const _0x1410c2 of _0x23005b['List']){if(_0x8f1bc8(0x27a)!==_0x8f1bc8(0x5b0)){_0x1410c2[_0x8f1bc8(0x58c)]=_0x1410c2['Name'][_0x8f1bc8(0x5ca)]()[_0x8f1bc8(0x2c6)](),VisuMZ[_0x8f1bc8(0x389)][_0x1410c2[_0x8f1bc8(0x58c)]]=_0x1410c2;if(!_0x4772b5['includes'](_0x1410c2[_0x8f1bc8(0x20c)]))_0x4772b5[_0x8f1bc8(0x3c4)](_0x1410c2['MapID']);}else _0x2c8895['clear']();}for(const _0x4ccdd8 of _0x4772b5){if(VisuMZ[_0x8f1bc8(0x262)][_0x4ccdd8])continue;const _0x3aec45=_0x8f1bc8(0x521)[_0x8f1bc8(0x417)](_0x4ccdd8[_0x8f1bc8(0x475)](0x3)),_0x50bec3=_0x8f1bc8(0x3a7)[_0x8f1bc8(0x417)](_0x4ccdd8);DataManager[_0x8f1bc8(0x30a)](_0x50bec3,_0x3aec45),setTimeout(this[_0x8f1bc8(0x372)][_0x8f1bc8(0x2a8)](this,_0x4ccdd8,_0x50bec3),0x64);}},Scene_Boot[_0x4cad34(0x3a4)][_0x4cad34(0x372)]=function(_0x158252,_0x55daa9){const _0x40975d=_0x4cad34;if(window[_0x55daa9]){if(_0x40975d(0x5ef)==='UJAWJ')VisuMZ[_0x40975d(0x262)][_0x158252]=window[_0x55daa9],window[_0x55daa9]=undefined;else{_0x43b366=_0x3a320c===_0x40975d(0x359)?0x5:_0x2aea2a;const _0x5c0f04=this['roundXWithDirection'](_0x14d533,_0x33ce82),_0x4ae497=this[_0x40975d(0x39c)](_0x5751e9,_0xea5f97),_0x598179=this['regionId'](_0x5c0f04,_0x4ae497),_0xdd0bdf=this[_0x40975d(0x37d)];if(_0xdd0bdf['VehicleDock'][_0x40975d(0x165)](_0x598179))return!![];else{const _0x59af97=_0x40975d(0x25e)['format'](_0x3fe61d[_0x40975d(0x19b)](0x0)['toUpperCase']()+_0x366fa8[_0x40975d(0x465)](0x1));if(_0xdd0bdf[_0x59af97])return _0xdd0bdf[_0x59af97][_0x40975d(0x165)](_0x598179);}return![];}}else{if(_0x40975d(0x1d9)!==_0x40975d(0x48a))setTimeout(this['VisuMZ_Setup_Preload_Map']['bind'](this,_0x158252,_0x55daa9),0x64);else{_0x2bd7a4[_0x40975d(0x54d)](_0x552074,_0x450fc1);const _0x31ffcb=_0xfe3b6[_0x40975d(0x4d7)](),_0x512956={'mapId':_0x208a78['MapId'],'eventId':_0x18dcd5[_0x40975d(0x494)]||_0x31ffcb[_0x40975d(0x477)](),'pageId':_0x57baed[_0x40975d(0x52e)]};if(_0x512956['mapId']<=0x0)_0x512956['mapId']=_0x352019?_0x55f18c[_0x40975d(0x574)]():0x1;_0x5bd341[_0x40975d(0x4d7)]()['pluginCommandCallEvent'](_0x512956);}}},VisuMZ[_0x4cad34(0x4cd)]=[],VisuMZ[_0x4cad34(0x490)]=[],VisuMZ['MapSwitches']=[],VisuMZ[_0x4cad34(0x233)]=[],VisuMZ[_0x4cad34(0x16e)]=[],VisuMZ[_0x4cad34(0x139)]=[],Scene_Boot['prototype'][_0x4cad34(0x125)]=function(){const _0x2da864=_0x4cad34;for(let _0x453413=0x1;_0x453413<$dataSystem[_0x2da864(0x58b)][_0x2da864(0x207)];_0x453413++){if(_0x2da864(0x476)!==_0x2da864(0x36b)){if($dataSystem['switches'][_0x453413][_0x2da864(0x12a)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x2da864(0x4cd)]['push'](_0x453413);if($dataSystem[_0x2da864(0x58b)][_0x453413]['match'](/<SELF>/i))VisuMZ[_0x2da864(0x490)][_0x2da864(0x3c4)](_0x453413);if($dataSystem[_0x2da864(0x58b)][_0x453413][_0x2da864(0x12a)](/<MAP>/i))VisuMZ[_0x2da864(0x5b3)][_0x2da864(0x3c4)](_0x453413);}else{if([0x1,0x4,0x7]['includes'](_0x4a970c))_0x119ab0-=0x1;if([0x3,0x6,0x9][_0x2da864(0x165)](_0x1f4279))_0x1c6899+=0x1;return this[_0x2da864(0x41b)](_0x33275b);}}for(let _0x4d0539=0x1;_0x4d0539<$dataSystem[_0x2da864(0x249)][_0x2da864(0x207)];_0x4d0539++){if(_0x2da864(0x467)!==_0x2da864(0x467))return _0x435069[_0x2da864(0x21d)];else{if($dataSystem[_0x2da864(0x249)][_0x4d0539]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x2da864(0x233)][_0x2da864(0x3c4)](_0x4d0539);if($dataSystem[_0x2da864(0x249)][_0x4d0539][_0x2da864(0x12a)](/<SELF>/i))VisuMZ[_0x2da864(0x16e)]['push'](_0x4d0539);if($dataSystem[_0x2da864(0x249)][_0x4d0539][_0x2da864(0x12a)](/<MAP>/i))VisuMZ['MapVariables'][_0x2da864(0x3c4)](_0x4d0539);}}},VisuMZ['EventsMoveCore']['CustomPageConditions']={},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x238)]['initialize']=function(){const _0x533cd2=_0x4cad34;this[_0x533cd2(0x356)]=new Game_CPCInterpreter(),this[_0x533cd2(0x442)]();},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x238)][_0x4cad34(0x442)]=function(){const _0x5c968f=_0x4cad34;this['_commonEvents']=[];for(const _0x1c65f1 of $dataCommonEvents){if(!_0x1c65f1)continue;VisuMZ[_0x5c968f(0x5b2)]['CustomPageConditions']['loadCPC'](_0x1c65f1);if(_0x1c65f1[_0x5c968f(0x5fe)][_0x5c968f(0x207)]>0x0)this[_0x5c968f(0x1a2)][_0x5c968f(0x3c4)](_0x1c65f1['id']);}},VisuMZ[_0x4cad34(0x5b2)]['CustomPageConditions'][_0x4cad34(0x1ae)]=function(_0x136109,_0xd63e49){const _0x4396a9=_0x4cad34;return this['_interpreter'][_0x4396a9(0x190)](_0x136109,_0xd63e49),this[_0x4396a9(0x356)][_0x4396a9(0x5f3)](),this['_interpreter'][_0x4396a9(0x5e9)];},VisuMZ['EventsMoveCore'][_0x4cad34(0x238)]['loadCPC']=function(_0x18d802){const _0x344275=_0x4cad34;let _0x28b1b0=![];_0x18d802['CPC']=[];for(const _0x200020 of _0x18d802['list']){if([0x6c,0x198]['includes'](_0x200020[_0x344275(0x123)])){const _0x1f7f8e=_0x200020[_0x344275(0x243)][0x0];if(_0x1f7f8e[_0x344275(0x12a)](/<PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x344275(0xef)!==_0x344275(0xef))return this['processMoveRouteFadeIn'](_0x43f4a0(_0x44f8e4['$1']));else _0x28b1b0=!![];}else _0x1f7f8e[_0x344275(0x12a)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x28b1b0=![]);}_0x28b1b0&&_0x18d802[_0x344275(0x5fe)][_0x344275(0x3c4)](_0x200020);}},getSelfSwitchValue=function(_0x4f1a7c,_0x75278b,_0x41d033){const _0x141260=_0x4cad34;let _0x9424c7=[_0x4f1a7c,_0x75278b,'Self\x20Switch\x20%1'[_0x141260(0x417)](_0x41d033)];return typeof _0x41d033==='string'&&(_0x141260(0x1e6)===_0x141260(0x34d)?(_0x383715[_0x141260(0x5b2)]['Game_Player_increaseSteps'][_0x141260(0x24b)](this),_0x34dac4[_0x141260(0x47d)](0x0)):_0x9424c7=[_0x4f1a7c,_0x75278b,_0x41d033['toUpperCase']()[_0x141260(0x2c6)]()]),$gameSelfSwitches[_0x141260(0x49f)](_0x9424c7);},getMapSwitchValue=function(_0xa877a6,_0x231036){const _0x6456a5=_0x4cad34;let _0x1e4558=[0x0,0x0,_0x6456a5(0x4e7)[_0x6456a5(0x417)](_0xa877a6,_0x231036)];return $gameSelfSwitches[_0x6456a5(0x49f)](_0x1e4558);},getMapVariableValue=function(_0x19a26d,_0x5ce6fb){const _0x379d93=_0x4cad34;let _0x435f7d=[0x0,0x0,_0x379d93(0x4ba)[_0x379d93(0x417)](_0x19a26d,_0x5ce6fb)];return $gameSelfSwitches[_0x379d93(0x49f)](_0x435f7d);},getSelfVariableValue=function(_0x24275d,_0x13144d,_0x4b2ef6){const _0x1077ac=_0x4cad34,_0x409a43=[_0x24275d,_0x13144d,'Self\x20Variable\x20%1'[_0x1077ac(0x417)](_0x4b2ef6)];return $gameSelfSwitches['value'](_0x409a43);},setSelfSwitchValue=function(_0x1527eb,_0x50ad92,_0x28c7b7,_0x441cad){const _0x5dd2b6=_0x4cad34;let _0x3dfb32=[_0x1527eb,_0x50ad92,_0x5dd2b6(0x5f0)[_0x5dd2b6(0x417)](_0x28c7b7)];typeof _0x28c7b7===_0x5dd2b6(0x39d)&&(_0x3dfb32=[_0x1527eb,_0x50ad92,_0x28c7b7[_0x5dd2b6(0x5ca)]()[_0x5dd2b6(0x2c6)]()]),$gameSelfSwitches[_0x5dd2b6(0x51a)](_0x3dfb32,_0x441cad);},setSelfVariableValue=function(_0x33e34d,_0x157488,_0x52d138,_0x28e4a8){const _0x587d2d=_0x4cad34,_0x572dc4=[_0x33e34d,_0x157488,_0x587d2d(0x503)[_0x587d2d(0x417)](_0x52d138)];$gameSelfSwitches[_0x587d2d(0x51a)](_0x572dc4,_0x28e4a8);},setMapSwitchValue=function(_0x55dd98,_0x4d9704,_0x20cc7f){const _0xdb081b=_0x4cad34;let _0x4a9661=[0x0,0x0,_0xdb081b(0x4e7)[_0xdb081b(0x417)](_0x55dd98,_0x4d9704)];$gameSelfSwitches[_0xdb081b(0x51a)](_0x4a9661,_0x20cc7f);},setMapVariableValue=function(_0x505ffb,_0x5defcc,_0x48d763){const _0xd7509a=_0x4cad34;let _0x229b0b=[0x0,0x0,_0xd7509a(0x4ba)[_0xd7509a(0x417)](_0x505ffb,_0x5defcc)];$gameSelfSwitches[_0xd7509a(0x51a)](_0x229b0b,_0x48d763);},DataManager[_0x4cad34(0x4cb)]=function(_0x5e3d68){const _0x1835c5=_0x4cad34;if(SceneManager['_scene'][_0x1835c5(0x35d)]===Scene_Debug)return![];return VisuMZ[_0x1835c5(0x4cd)]['includes'](_0x5e3d68);},DataManager[_0x4cad34(0x2b1)]=function(_0x57e368){const _0x537ac6=_0x4cad34;if(SceneManager[_0x537ac6(0x568)][_0x537ac6(0x35d)]===Scene_Debug)return![];return VisuMZ['AdvancedVariables'][_0x537ac6(0x165)](_0x57e368);},DataManager[_0x4cad34(0x3b2)]=function(_0x227656){const _0x19873d=_0x4cad34;if(SceneManager['_scene'][_0x19873d(0x35d)]===Scene_Debug)return![];return VisuMZ[_0x19873d(0x490)][_0x19873d(0x165)](_0x227656);},DataManager[_0x4cad34(0x2e4)]=function(_0x1ecd27){const _0x393ec0=_0x4cad34;if(SceneManager[_0x393ec0(0x568)]['constructor']===Scene_Debug)return![];return VisuMZ['SelfVariables'][_0x393ec0(0x165)](_0x1ecd27);},DataManager[_0x4cad34(0x184)]=function(_0x4af8e1){const _0x251862=_0x4cad34;if(BattleManager[_0x251862(0x450)]())return![];return VisuMZ[_0x251862(0x5b3)][_0x251862(0x165)](_0x4af8e1);},DataManager[_0x4cad34(0x584)]=function(_0x5b1875){const _0x33ed14=_0x4cad34;if(BattleManager[_0x33ed14(0x450)]())return![];return VisuMZ[_0x33ed14(0x139)]['includes'](_0x5b1875);},VisuMZ[_0x4cad34(0x5b2)]['Game_Temp_setDestination']=Game_Temp[_0x4cad34(0x3a4)][_0x4cad34(0x588)],Game_Temp[_0x4cad34(0x3a4)][_0x4cad34(0x588)]=function(_0x342639,_0x281392){const _0x461568=_0x4cad34;if(this[_0x461568(0x53a)](_0x342639,_0x281392))return;VisuMZ[_0x461568(0x5b2)]['Game_Temp_setDestination'][_0x461568(0x24b)](this,_0x342639,_0x281392);},Game_Temp[_0x4cad34(0x3a4)][_0x4cad34(0x53a)]=function(_0x253759,_0x41843c){const _0xd0844c=_0x4cad34,_0x125618=$gameMap['eventsXy'](_0x253759,_0x41843c);for(const _0x2b432f of _0x125618){if('OYZMH'!==_0xd0844c(0x59c)){if(!_0x303f71[_0xd0844c(0x22f)]()&&_0x4822d3<0x0){let _0x27bd29=_0x39d1d2[_0xd0844c(0x447)]();if(_0x27bd29>0x0)return _0x58f709[_0xd0844c(0x28a)]()[_0xd0844c(0x3ca)](_0x27bd29-0x1);}return _0x101118[_0xd0844c(0x5b2)][_0xd0844c(0x3c9)][_0xd0844c(0x24b)](this,_0x454d74);}else{if(_0x2b432f&&_0x2b432f[_0xd0844c(0x5cc)]()){if(_0xd0844c(0x27e)===_0xd0844c(0x3ce)){_0x33a5be[_0xd0844c(0x54d)](_0x138b2a,_0x1855f9);const _0x276eeb=_0x2963cc[_0xd0844c(0x4d7)]();_0x39db8c[_0xd0844c(0x524)](_0x10112e[_0xd0844c(0x1e8)]||_0x276eeb[_0xd0844c(0x477)]());}else return _0x2b432f[_0xd0844c(0xfb)](),!![];}}}return![];},Game_Temp[_0x4cad34(0x3a4)][_0x4cad34(0x443)]=function(_0x4ded9a){const _0x4651c9=_0x4cad34;this[_0x4651c9(0x1f2)]=_0x4ded9a;},Game_Temp['prototype'][_0x4cad34(0x4d7)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp['prototype']['registerSelfTarget']=function(_0x3c54f3){const _0x2de89e=_0x4cad34;this[_0x2de89e(0x42a)]=_0x3c54f3;},Game_Temp['prototype'][_0x4cad34(0xed)]=function(){const _0x2c6e72=_0x4cad34;this[_0x2c6e72(0x42a)]=undefined;},Game_Temp['prototype'][_0x4cad34(0x4e1)]=function(){const _0xc0fbd1=_0x4cad34;return this[_0xc0fbd1(0x42a)];},VisuMZ['EventsMoveCore']['Game_System_initialize']=Game_System['prototype'][_0x4cad34(0x532)],Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x532)]=function(){const _0x10abb8=_0x4cad34;VisuMZ[_0x10abb8(0x5b2)]['Game_System_initialize'][_0x10abb8(0x24b)](this),this['initEventsMoveCore'](),this[_0x10abb8(0x582)]();},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0xf7)]=function(){const _0x3b1c38=_0x4cad34;this[_0x3b1c38(0x2b6)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x3b1c38(0x208)]={},this[_0x3b1c38(0x485)]=[],this[_0x3b1c38(0x518)]={},this[_0x3b1c38(0x1d2)]={},this[_0x3b1c38(0x5d3)]=![],this['_PlayerDiagonalSetting']='default';},Game_System[_0x4cad34(0x3a4)]['isDashingEnabled']=function(){const _0xd1980c=_0x4cad34;if(this[_0xd1980c(0x2b6)]===undefined)this[_0xd1980c(0xf7)]();if(this[_0xd1980c(0x2b6)][_0xd1980c(0x1ee)]===undefined)this[_0xd1980c(0xf7)]();return this['_EventsMoveCoreSettings'][_0xd1980c(0x1ee)];},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x3a6)]=function(_0x363333){const _0x499a67=_0x4cad34;if(this[_0x499a67(0x2b6)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings']['DashingEnable']===undefined)this['initEventsMoveCore']();this[_0x499a67(0x2b6)][_0x499a67(0x1ee)]=_0x363333;},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x573)]=function(){const _0x2bcf33=_0x4cad34;if(this[_0x2bcf33(0x2b6)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x2bcf33(0x23b)]===undefined)this[_0x2bcf33(0xf7)]();return this[_0x2bcf33(0x2b6)][_0x2bcf33(0x23b)];},Game_System[_0x4cad34(0x3a4)]['setAllowEventAutoMovement']=function(_0x2d9304){const _0x313e14=_0x4cad34;if(this[_0x313e14(0x2b6)]===undefined)this[_0x313e14(0xf7)]();if(this['_EventsMoveCoreSettings'][_0x313e14(0x23b)]===undefined)this[_0x313e14(0xf7)]();this['_EventsMoveCoreSettings'][_0x313e14(0x23b)]=_0x2d9304;},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x3f3)]=function(){const _0x23c2cc=_0x4cad34;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0x23c2cc(0x2b6)][_0x23c2cc(0x235)]===undefined)this[_0x23c2cc(0xf7)]();return this[_0x23c2cc(0x2b6)]['VisibleEventLabels'];},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x5b5)]=function(_0x2c5e35){const _0x3ddb2d=_0x4cad34;if(this['_EventsMoveCoreSettings']===undefined)this[_0x3ddb2d(0xf7)]();if(this[_0x3ddb2d(0x2b6)]['VisibleEventLabels']===undefined)this[_0x3ddb2d(0xf7)]();this['_EventsMoveCoreSettings'][_0x3ddb2d(0x235)]=_0x2c5e35;},Game_System['prototype']['isPlayerControlDisabled']=function(){const _0x4ded3f=_0x4cad34;return this['_DisablePlayerControl']===undefined&&(this[_0x4ded3f(0x5d3)]=![]),this['_DisablePlayerControl'];},Game_System['prototype'][_0x4cad34(0x112)]=function(_0x14eb2c){const _0x3d2917=_0x4cad34;this[_0x3d2917(0x5d3)]=_0x14eb2c;},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x599)]=function(){const _0x54c1df=_0x4cad34;return this[_0x54c1df(0x297)];},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x1a6)]=function(_0x356ec2){const _0x4faa34=_0x4cad34;this['_PlayerDiagonalSetting']=String(_0x356ec2)[_0x4faa34(0x1f8)]()[_0x4faa34(0x2c6)]();},Game_System['prototype']['getEventIconData']=function(_0x20336b){const _0x4bd0f9=_0x4cad34;if(this[_0x4bd0f9(0x208)]===undefined)this['initEventsMoveCore']();if(!_0x20336b)return null;if(_0x20336b===$gamePlayer)return this[_0x4bd0f9(0x208)]['Player'];else{const _0x86729c=VisuMZ[_0x4bd0f9(0x5b2)][_0x4bd0f9(0x2f1)],_0x3cede5=_0x4bd0f9(0x2a4)[_0x4bd0f9(0x417)](_0x20336b[_0x4bd0f9(0x2c8)],_0x20336b[_0x4bd0f9(0x1a9)]);return this[_0x4bd0f9(0x208)][_0x3cede5]=this[_0x4bd0f9(0x208)][_0x3cede5]||{'iconIndex':0x0,'bufferX':_0x86729c['Icon']['BufferX'],'bufferY':_0x86729c[_0x4bd0f9(0x260)][_0x4bd0f9(0x55e)],'blendMode':_0x86729c[_0x4bd0f9(0x260)][_0x4bd0f9(0x395)]},this['_EventIcons'][_0x3cede5];}},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x562)]=function(_0x5be402,_0x285aa9,_0x15a611,_0x3cfde1,_0x1ae492){const _0x3c7707=_0x4cad34;if(this['_EventIcons']===undefined)this[_0x3c7707(0xf7)]();const _0x3bf92a=_0x5be402===$gamePlayer?_0x3c7707(0x1f0):_0x3c7707(0x2a4)[_0x3c7707(0x417)](_0x5be402[_0x3c7707(0x2c8)],_0x5be402[_0x3c7707(0x1a9)]);this['_EventIcons'][_0x3bf92a]={'iconIndex':_0x285aa9,'bufferX':_0x15a611,'bufferY':_0x3cfde1,'blendMode':_0x1ae492};},Game_System['prototype'][_0x4cad34(0x57b)]=function(_0xfc1499,_0x487d32,_0x19a43b,_0x592105,_0x1649d4,_0x5f4050){const _0x35c5c4=_0x4cad34;if(this[_0x35c5c4(0x208)]===undefined)this[_0x35c5c4(0xf7)]();const _0x3c1ed1=_0x35c5c4(0x2a4)[_0x35c5c4(0x417)](_0xfc1499,_0x487d32);this[_0x35c5c4(0x208)][_0x3c1ed1]={'iconIndex':_0x19a43b,'bufferX':_0x592105,'bufferY':_0x1649d4,'blendMode':_0x5f4050};},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x217)]=function(_0x310ea8){const _0x108579=_0x4cad34;if(this[_0x108579(0x208)]===undefined)this[_0x108579(0xf7)]();if(!_0x310ea8)return null;_0x310ea8===$gamePlayer?delete this['_EventIcons'][_0x108579(0x1f0)]:this[_0x108579(0x508)](_0x310ea8[_0x108579(0x2c8)],_0x310ea8[_0x108579(0x1a9)]);},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x508)]=function(_0x3cb179,_0x4c23a9){const _0x9081bb=_0x4cad34;if(this[_0x9081bb(0x208)]===undefined)this['initEventsMoveCore']();const _0x60217c=_0x9081bb(0x2a4)[_0x9081bb(0x417)](_0x3cb179,_0x4c23a9);delete this[_0x9081bb(0x208)][_0x60217c];},Game_System[_0x4cad34(0x3a4)]['getSavedEventLocation']=function(_0x1f5dd3){const _0x2e881b=_0x4cad34;if(this[_0x2e881b(0x1d2)]===undefined)this['initEventsMoveCore']();if(!_0x1f5dd3)return null;const _0x361728=_0x2e881b(0x2a4)['format'](_0x1f5dd3[_0x2e881b(0x2c8)],_0x1f5dd3[_0x2e881b(0x1a9)]);return this[_0x2e881b(0x1d2)][_0x361728];},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x51b)]=function(_0x131eff){const _0x4281c5=_0x4cad34;if(this[_0x4281c5(0x1d2)]===undefined)this[_0x4281c5(0xf7)]();if(!_0x131eff)return;const _0x4c7aa6='Map%1-Event%2'[_0x4281c5(0x417)](_0x131eff['_mapId'],_0x131eff[_0x4281c5(0x1a9)]);this[_0x4281c5(0x1d2)][_0x4c7aa6]={'direction':_0x131eff[_0x4281c5(0x2a1)](),'x':Math[_0x4281c5(0x1b7)](_0x131eff['x']),'y':Math['round'](_0x131eff['y']),'pageIndex':_0x131eff['_pageIndex'],'moveRouteIndex':_0x131eff['_moveRouteIndex']};},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x231)]=function(_0x4ff184){const _0xd61829=_0x4cad34;if(this['_SavedEventLocations']===undefined)this[_0xd61829(0xf7)]();if(!_0x4ff184)return;this[_0xd61829(0x43e)](_0x4ff184['_mapId'],_0x4ff184[_0xd61829(0x1a9)]);},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x43e)]=function(_0x2fb44c,_0xbad4f2){const _0x929e08=_0x4cad34;if(this[_0x929e08(0x1d2)]===undefined)this[_0x929e08(0xf7)]();const _0x482294=_0x929e08(0x2a4)[_0x929e08(0x417)](_0x2fb44c,_0xbad4f2);delete this[_0x929e08(0x1d2)][_0x482294];},Game_System[_0x4cad34(0x3a4)]['createSaveEventLocationData']=function(_0x158f65,_0x4c65af,_0x528e58,_0x8166e5,_0x11970c,_0x3e0b90,_0x52a7df){const _0x55aa39=_0x4cad34;if(this[_0x55aa39(0x1d2)]===undefined)this['initEventsMoveCore']();const _0x5e4cec='Map%1-Event%2'['format'](_0x158f65,_0x4c65af);this[_0x55aa39(0x1d2)][_0x5e4cec]={'direction':_0x11970c,'x':Math[_0x55aa39(0x1b7)](_0x528e58),'y':Math['round'](_0x8166e5),'pageIndex':_0x3e0b90,'moveRouteIndex':_0x52a7df};},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x484)]=function(_0x24577b){const _0x4c5f47=_0x4cad34;if(this[_0x4c5f47(0x518)]===undefined)this[_0x4c5f47(0xf7)]();if(!_0x24577b)return;const _0x2337f3='Map%1-Event%2'['format'](_0x24577b[_0x4c5f47(0x2c8)],_0x24577b[_0x4c5f47(0x1a9)]);return this['_PreservedEventMorphData'][_0x2337f3];},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x352)]=function(_0x45f988,_0x15012a,_0x34d5eb,_0x2bcf35,_0x41485a){const _0x54bd5c=_0x4cad34;if(this[_0x54bd5c(0x518)]===undefined)this[_0x54bd5c(0xf7)]();const _0x1b6e7c=_0x54bd5c(0x2a4)['format'](_0x45f988,_0x15012a);this['_PreservedEventMorphData'][_0x1b6e7c]={'template':_0x34d5eb,'mapId':_0x2bcf35,'eventId':_0x41485a};},Game_System['prototype'][_0x4cad34(0x347)]=function(_0x14ad77,_0x3c8cfd){const _0x5a6ae2=_0x4cad34;if(this[_0x5a6ae2(0x518)]===undefined)this[_0x5a6ae2(0xf7)]();const _0x5440a7=_0x5a6ae2(0x2a4)[_0x5a6ae2(0x417)](_0x14ad77,_0x3c8cfd);delete this['_PreservedEventMorphData'][_0x5440a7];},Game_System[_0x4cad34(0x3a4)]['getMapSpawnedEventData']=function(_0x478db0){const _0x14f08e=_0x4cad34;if(this[_0x14f08e(0x485)]===undefined)this[_0x14f08e(0xf7)]();return this[_0x14f08e(0x485)][_0x478db0]=this[_0x14f08e(0x485)][_0x478db0]||[],this['_MapSpawnedEventData'][_0x478db0];},Game_System[_0x4cad34(0x3a4)]['removeTemporaryMapSpawnedEvents']=function(_0x41dffc){const _0x86a902=_0x4cad34,_0xb164f8=this[_0x86a902(0x4da)](_0x41dffc);for(const _0x127235 of _0xb164f8){if(!_0x127235)continue;if(_0x127235[_0x86a902(0x28d)])continue;const _0x1fe0a8=_0xb164f8['indexOf'](_0x127235);_0xb164f8[_0x1fe0a8]=null;}},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x582)]=function(){const _0x106b69=_0x4cad34;this[_0x106b69(0x53e)]=0x0,this[_0x106b69(0x27b)]=![];},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x447)]=function(){const _0x49b437=_0x4cad34;if(this[_0x49b437(0x53e)]===undefined)this[_0x49b437(0x582)]();return this[_0x49b437(0x53e)];},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x497)]=function(_0x2df01b){const _0x567a08=_0x4cad34;if(this[_0x567a08(0x53e)]===undefined)this['initFollowerController']();this[_0x567a08(0x53e)]=_0x2df01b;;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x3c9)]=Game_Interpreter[_0x4cad34(0x3a4)][_0x4cad34(0x145)],Game_Interpreter[_0x4cad34(0x3a4)][_0x4cad34(0x145)]=function(_0x232642){const _0x1a105e=_0x4cad34;if(!$gameParty[_0x1a105e(0x22f)]()&&_0x232642<0x0){if(_0x1a105e(0x4ea)!==_0x1a105e(0x14a)){let _0x13eb2b=$gameSystem['getControlledFollowerID']();if(_0x13eb2b>0x0){if('qKpRk'===_0x1a105e(0x1b6))_0x22f8f0[_0x5ddf6b]?(_0x338885[_0x1a105e(0x262)][_0x295435]=_0x548df7[_0x35af75],_0x65314a[_0x3be172]=_0x1857d4):_0x337be3(this[_0x1a105e(0x372)][_0x1a105e(0x2a8)](this,_0xdaa499,_0x1cd65c),0x64);else return $gamePlayer['followers']()[_0x1a105e(0x3ca)](_0x13eb2b-0x1);}}else _0x295a98[_0x1a105e(0x47d)](this[_0x1a105e(0x1a9)]);}return VisuMZ[_0x1a105e(0x5b2)][_0x1a105e(0x3c9)][_0x1a105e(0x24b)](this,_0x232642);},Game_System['prototype']['isStopFollowerChasing']=function(){const _0x5566fe=_0x4cad34;if(this[_0x5566fe(0x27b)]===undefined)this[_0x5566fe(0x582)]();return this[_0x5566fe(0x27b)];},Game_System[_0x4cad34(0x3a4)][_0x4cad34(0x1e0)]=function(_0x22d807){const _0x44eb0f=_0x4cad34;if(this[_0x44eb0f(0x27b)]===undefined)this[_0x44eb0f(0x582)]();this[_0x44eb0f(0x27b)]=_0x22d807;;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x42b)]=Game_Timer[_0x4cad34(0x3a4)][_0x4cad34(0x532)],Game_Timer[_0x4cad34(0x3a4)][_0x4cad34(0x532)]=function(){const _0x47ac86=_0x4cad34;VisuMZ[_0x47ac86(0x5b2)][_0x47ac86(0x42b)]['call'](this),this[_0x47ac86(0xf7)]();},Game_Timer[_0x4cad34(0x3a4)][_0x4cad34(0xf7)]=function(){const _0x1fb93b=_0x4cad34;this[_0x1fb93b(0x14f)]=![],this[_0x1fb93b(0x3c5)]=-0x1,this[_0x1fb93b(0x14d)]=0x0;},Game_Timer[_0x4cad34(0x3a4)][_0x4cad34(0x3ee)]=function(_0x30ccce){const _0x354d4f=_0x4cad34;if(!_0x30ccce)return;if(!this[_0x354d4f(0x31d)])return;if(this[_0x354d4f(0x14f)])return;if(this[_0x354d4f(0x26d)]<=0x0)return;if(this[_0x354d4f(0x3c5)]===undefined)this['initEventsMoveCore']();this[_0x354d4f(0x26d)]+=this['_speed'],this[_0x354d4f(0x26d)]<=0x0&&this['onExpire']();},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x393)]=Game_Timer[_0x4cad34(0x3a4)][_0x4cad34(0x2dc)],Game_Timer[_0x4cad34(0x3a4)][_0x4cad34(0x2dc)]=function(_0x129ee3){const _0x47939a=_0x4cad34;VisuMZ[_0x47939a(0x5b2)][_0x47939a(0x393)][_0x47939a(0x24b)](this,_0x129ee3);if(this[_0x47939a(0x14f)]===undefined)this['initEventsMoveCore']();this[_0x47939a(0x14f)]=![];},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x5f8)]=Game_Timer[_0x4cad34(0x3a4)]['stop'],Game_Timer[_0x4cad34(0x3a4)][_0x4cad34(0x5c6)]=function(){const _0xfeb39=_0x4cad34;VisuMZ[_0xfeb39(0x5b2)][_0xfeb39(0x5f8)][_0xfeb39(0x24b)](this);if(this[_0xfeb39(0x14f)]===undefined)this[_0xfeb39(0xf7)]();this[_0xfeb39(0x14f)]=![];},Game_Timer[_0x4cad34(0x3a4)][_0x4cad34(0x48d)]=function(){const _0x33986e=_0x4cad34;if(this[_0x33986e(0x26d)]<=0x0)return;this[_0x33986e(0x14f)]=!![],this[_0x33986e(0x31d)]=!![];},Game_Timer['prototype']['resume']=function(){const _0x2a0a7a=_0x4cad34;if(this[_0x2a0a7a(0x26d)]<=0x0)return;this[_0x2a0a7a(0x14f)]=![],this[_0x2a0a7a(0x31d)]=!![];},Game_Timer[_0x4cad34(0x3a4)]['gainFrames']=function(_0x2972a3){const _0x3fd90f=_0x4cad34;this[_0x3fd90f(0x26d)]=this[_0x3fd90f(0x26d)]||0x0,this[_0x3fd90f(0x26d)]+=_0x2972a3,this['_working']=!![],this['_frames']=Math[_0x3fd90f(0x59d)](0x1,this[_0x3fd90f(0x26d)]);},Game_Timer[_0x4cad34(0x3a4)][_0x4cad34(0x1e5)]=function(_0x35af01){const _0x4a43b3=_0x4cad34;this[_0x4a43b3(0x26d)]=this[_0x4a43b3(0x26d)]||0x0,this[_0x4a43b3(0x26d)]=_0x35af01,this[_0x4a43b3(0x31d)]=!![],this[_0x4a43b3(0x26d)]=Math[_0x4a43b3(0x59d)](0x1,this[_0x4a43b3(0x26d)]);},Game_Timer['prototype'][_0x4cad34(0x5e2)]=function(_0x411b5c){const _0x465ad4=_0x4cad34;this[_0x465ad4(0x3c5)]=_0x411b5c,this[_0x465ad4(0x31d)]=!![],_0x411b5c>0x0&&(_0x465ad4(0x1d8)!==_0x465ad4(0x1d8)?(_0x371c64['registerSelfTarget'](_0x2d4b08[_0x465ad4(0x2be)]),_0x5ebace['EventsMoveCore'][_0x465ad4(0x3dd)]['call'](this),_0x2f697c[_0x465ad4(0xed)](),_0x4bf398[_0x465ad4(0x2be)]=_0x2389f4):this[_0x465ad4(0x26d)]=Math[_0x465ad4(0x59d)](this['_frames'],0x1));},Game_Timer['prototype']['setCommonEvent']=function(_0x15203c){if(this['_expireCommonEvent']===undefined)this['initEventsMoveCore']();this['_expireCommonEvent']=_0x15203c;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x29f)]=Game_Timer['prototype'][_0x4cad34(0x396)],Game_Timer[_0x4cad34(0x3a4)][_0x4cad34(0x396)]=function(){const _0x2ffa60=_0x4cad34;if(this[_0x2ffa60(0x14d)]===undefined)this['initEventsMoveCore']();this[_0x2ffa60(0x14d)]?$gameTemp[_0x2ffa60(0x1c1)](this['_expireCommonEvent']):VisuMZ[_0x2ffa60(0x5b2)][_0x2ffa60(0x29f)][_0x2ffa60(0x24b)](this);},VisuMZ['EventsMoveCore'][_0x4cad34(0x598)]=Game_Message[_0x4cad34(0x3a4)]['add'],Game_Message['prototype'][_0x4cad34(0x1e4)]=function(_0x2e84b3){const _0x4594ae=_0x4cad34;VisuMZ['EventsMoveCore'][_0x4594ae(0x598)][_0x4594ae(0x24b)](this,_0x2e84b3),this['_selfEvent']=$gameTemp[_0x4594ae(0x4e1)]();},Game_Message[_0x4cad34(0x3a4)][_0x4cad34(0x58d)]=function(){const _0x2fcc25=_0x4cad34;$gameTemp[_0x2fcc25(0x280)](this[_0x2fcc25(0x140)]);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x384)]=Game_Switches[_0x4cad34(0x3a4)][_0x4cad34(0x49f)],Game_Switches[_0x4cad34(0x3a4)]['value']=function(_0x4bb358){const _0x4e4cfa=_0x4cad34;if(DataManager['isAdvancedSwitch'](_0x4bb358))return!!this['advancedValue'](_0x4bb358);else{if(DataManager[_0x4e4cfa(0x3b2)](_0x4bb358)){if('sCMBL'===_0x4e4cfa(0x330))_0x2baa75=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6];else return!!this[_0x4e4cfa(0x576)](_0x4bb358);}else{if(DataManager[_0x4e4cfa(0x184)](_0x4bb358)){if(_0x4e4cfa(0x517)!==_0x4e4cfa(0x517)){if(_0x315f97['match'](/Z/i))_0x1a6a66=_0x4e4cfa(0x227);if(_0x30685b[_0x4e4cfa(0x12a)](/SLEEP/i))_0x467566=_0x4e4cfa(0x227);this[_0x4e4cfa(0x558)]()&&(this[_0x4e4cfa(0x537)]=_0x272530[_0x4e4cfa(0x5ca)]()[_0x4e4cfa(0x2c6)](),this[_0x4e4cfa(0x1cd)]=_0x1e6529||_0x1e20c5);}else return!!this[_0x4e4cfa(0x194)](_0x4bb358);}else return VisuMZ[_0x4e4cfa(0x5b2)]['Game_Switches_value']['call'](this,_0x4bb358);}}},Game_Switches[_0x4cad34(0x185)]={},Game_Switches[_0x4cad34(0x3a4)]['advancedValue']=function(_0x437c02){const _0x147972=_0x4cad34;if(!Game_Switches['advancedFunc'][_0x437c02]){if(_0x147972(0x5ac)!==_0x147972(0x5ac))return _0x342a93>0x0?0x4:0x6;else{$dataSystem[_0x147972(0x58b)][_0x437c02][_0x147972(0x12a)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x3f54a5='return\x20%1'['format'](String(RegExp['$1']));Game_Switches[_0x147972(0x185)][_0x437c02]=new Function(_0x147972(0x242),_0x3f54a5);}}const _0x4b59dc=$gameTemp[_0x147972(0x4e1)]()||this;return Game_Switches[_0x147972(0x185)][_0x437c02][_0x147972(0x24b)](_0x4b59dc,_0x437c02);},Game_Switches['prototype'][_0x4cad34(0x576)]=function(_0x405963){const _0x3f21e0=_0x4cad34,_0x1e4cac=$gameTemp[_0x3f21e0(0x4e1)]()||this;if(_0x1e4cac[_0x3f21e0(0x35d)]!==Game_Event)return _0x3f21e0(0x17e)!==_0x3f21e0(0x17e)?this[_0x3f21e0(0x208)][_0x3f21e0(0x1f0)]:VisuMZ[_0x3f21e0(0x5b2)]['Game_Switches_value'][_0x3f21e0(0x24b)](this,_0x405963);else{const _0x4c41ef=[_0x1e4cac[_0x3f21e0(0x2c8)],_0x1e4cac[_0x3f21e0(0x1a9)],'Self\x20Switch\x20%1'[_0x3f21e0(0x417)](_0x405963)];return $gameSelfSwitches['value'](_0x4c41ef);}},Game_Switches[_0x4cad34(0x3a4)][_0x4cad34(0x194)]=function(_0x57707e){const _0x5bd151=_0x4cad34,_0xe25412=$gameMap?$gameMap[_0x5bd151(0x574)]():0x0,_0x52c72d=[0x0,0x0,_0x5bd151(0x4e7)[_0x5bd151(0x417)](_0xe25412,_0x57707e)];return $gameSelfSwitches[_0x5bd151(0x49f)](_0x52c72d);},VisuMZ[_0x4cad34(0x5b2)]['Game_Switches_setValue']=Game_Switches['prototype'][_0x4cad34(0x51a)],Game_Switches[_0x4cad34(0x3a4)]['setValue']=function(_0x3b5500,_0x560df1){const _0x5f2929=_0x4cad34;if(DataManager[_0x5f2929(0x3b2)](_0x3b5500))'rsfkZ'!=='rsfkZ'?this[_0x5f2929(0x2d7)][_0x5f2929(0xff)]=_0xe5a4ce(_0x3b6774['$1']):this['setSelfValue'](_0x3b5500,_0x560df1);else DataManager[_0x5f2929(0x184)](_0x3b5500)?this[_0x5f2929(0x5af)](_0x3b5500,_0x560df1):VisuMZ[_0x5f2929(0x5b2)][_0x5f2929(0x5e5)][_0x5f2929(0x24b)](this,_0x3b5500,_0x560df1);},Game_Switches[_0x4cad34(0x3a4)]['setSelfValue']=function(_0x269735,_0xc37161){const _0x4534d2=_0x4cad34,_0x343857=$gameTemp[_0x4534d2(0x4e1)]()||this;if(_0x343857[_0x4534d2(0x35d)]!==Game_Event)VisuMZ[_0x4534d2(0x5b2)]['Game_Switches_setValue']['call'](this,_0x269735,_0xc37161);else{if(_0x4534d2(0x2ac)===_0x4534d2(0x2ac)){const _0x3675ce=[_0x343857['_mapId'],_0x343857[_0x4534d2(0x1a9)],_0x4534d2(0x5f0)[_0x4534d2(0x417)](_0x269735)];$gameSelfSwitches[_0x4534d2(0x51a)](_0x3675ce,_0xc37161);}else this['_spriteOffsetX']=_0x1c15ea(_0x1441c2['$1']);}},Game_Switches[_0x4cad34(0x3a4)][_0x4cad34(0x5af)]=function(_0x510b11,_0x318bc6){const _0x3d291f=_0x4cad34,_0x318111=$gameMap?$gameMap[_0x3d291f(0x574)]():0x0,_0x55e65a=[0x0,0x0,_0x3d291f(0x4e7)[_0x3d291f(0x417)](_0x318111,_0x510b11)];return $gameSelfSwitches[_0x3d291f(0x51a)](_0x55e65a,_0x318bc6);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x244)]=Game_Variables[_0x4cad34(0x3a4)][_0x4cad34(0x49f)],Game_Variables[_0x4cad34(0x3a4)][_0x4cad34(0x49f)]=function(_0x1abc5c){const _0xf809a9=_0x4cad34;if(DataManager[_0xf809a9(0x2b1)](_0x1abc5c))return this['advancedValue'](_0x1abc5c);else{if(DataManager['isSelfVariable'](_0x1abc5c)){if(_0xf809a9(0x36f)!==_0xf809a9(0x36f))this[_0xf809a9(0x2b6)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0xf809a9(0x208)]={},this[_0xf809a9(0x485)]=[],this[_0xf809a9(0x518)]={},this[_0xf809a9(0x1d2)]={},this[_0xf809a9(0x5d3)]=![],this['_PlayerDiagonalSetting']=_0xf809a9(0x362);else return this[_0xf809a9(0x576)](_0x1abc5c);}else{if(DataManager[_0xf809a9(0x584)](_0x1abc5c)){if(_0xf809a9(0x25a)!==_0xf809a9(0x25a))this['initialize'](...arguments);else return this['mapValue'](_0x1abc5c);}else{if(_0xf809a9(0x4b3)===_0xf809a9(0x291))_0x4f8880['registerSelfTarget'](_0x393b3b['_selfTargetItemChoice']),_0x3e0cc4[_0xf809a9(0x5b2)][_0xf809a9(0x3b0)][_0xf809a9(0x24b)](this),_0x4ebfc7[_0xf809a9(0xed)](),_0x5eded3[_0xf809a9(0x2be)]=_0x178414;else return VisuMZ[_0xf809a9(0x5b2)][_0xf809a9(0x244)]['call'](this,_0x1abc5c);}}}},Game_Variables[_0x4cad34(0x185)]={},Game_Variables[_0x4cad34(0x3a4)]['advancedValue']=function(_0x4ee24c){const _0x3c1659=_0x4cad34;if(!Game_Variables[_0x3c1659(0x185)][_0x4ee24c]){$dataSystem[_0x3c1659(0x249)][_0x4ee24c][_0x3c1659(0x12a)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1c2d17=_0x3c1659(0x24d)['format'](String(RegExp['$1']));Game_Variables[_0x3c1659(0x185)][_0x4ee24c]=new Function(_0x3c1659(0x18e),_0x1c2d17);}const _0x4d33f0=$gameTemp[_0x3c1659(0x4e1)]()||this;return Game_Variables[_0x3c1659(0x185)][_0x4ee24c]['call'](_0x4d33f0,_0x4ee24c);},Game_Variables[_0x4cad34(0x3a4)][_0x4cad34(0x576)]=function(_0x1b29cd){const _0x3e4655=_0x4cad34,_0x356a5f=$gameTemp[_0x3e4655(0x4e1)]()||this;if(_0x356a5f[_0x3e4655(0x35d)]!==Game_Event)return VisuMZ[_0x3e4655(0x5b2)][_0x3e4655(0x244)][_0x3e4655(0x24b)](this,_0x1b29cd);else{if(_0x3e4655(0x534)===_0x3e4655(0x354)){if(!this['isSpriteVS8dir']())_0x310210=this[_0x3e4655(0x1d5)](_0xa7ee40);_0x529029[_0x3e4655(0x5b2)][_0x3e4655(0x113)][_0x3e4655(0x24b)](this,_0x460389);}else{const _0x1b8b11=[_0x356a5f[_0x3e4655(0x2c8)],_0x356a5f[_0x3e4655(0x1a9)],_0x3e4655(0x503)[_0x3e4655(0x417)](_0x1b29cd)];return $gameSelfSwitches[_0x3e4655(0x49f)](_0x1b8b11);}}},Game_Variables[_0x4cad34(0x3a4)]['mapValue']=function(_0x2b3d6e){const _0x166fde=_0x4cad34,_0xebbd04=$gameMap?$gameMap[_0x166fde(0x574)]():0x0,_0x59e2ed=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x166fde(0x417)](_0xebbd04,_0x2b3d6e)];return $gameSelfSwitches[_0x166fde(0x49f)](_0x59e2ed)||0x0;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x500)]=Game_Variables['prototype'][_0x4cad34(0x51a)],Game_Variables[_0x4cad34(0x3a4)]['setValue']=function(_0x816aef,_0x9a6ad7){const _0x2322e8=_0x4cad34;if(DataManager[_0x2322e8(0x2e4)](_0x816aef))_0x2322e8(0x1a0)==='CSWYa'?_0x3ce682[0x2]=_0x2594b4(_0x47ce36)[_0x2322e8(0x19b)](0x0)[_0x2322e8(0x5ca)]()['trim']():this[_0x2322e8(0x353)](_0x816aef,_0x9a6ad7);else{if(DataManager[_0x2322e8(0x584)](_0x816aef)){if(_0x2322e8(0x121)==='pFARU')this[_0x2322e8(0x5af)](_0x816aef,_0x9a6ad7);else{if(_0x3809f9[_0x2322e8(0x2e4)](_0x36b9af))this[_0x2322e8(0x353)](_0x49836d,_0x456ec0);else _0x568edd['isMapVariable'](_0x3189cb)?this[_0x2322e8(0x5af)](_0x457a11,_0x1b787a):_0x46c931['EventsMoveCore'][_0x2322e8(0x500)][_0x2322e8(0x24b)](this,_0x57e628,_0x5aebbe);}}else _0x2322e8(0x405)===_0x2322e8(0x44d)?this[_0x2322e8(0x1ea)]=0x0:VisuMZ[_0x2322e8(0x5b2)]['Game_Variables_setValue'][_0x2322e8(0x24b)](this,_0x816aef,_0x9a6ad7);}},Game_Variables[_0x4cad34(0x3a4)]['setSelfValue']=function(_0x2e40c3,_0x270655){const _0x4601d3=_0x4cad34,_0xc60a91=$gameTemp['getSelfTarget']()||this;if(_0xc60a91['constructor']!==Game_Event){if(_0x4601d3(0x5c0)==='AiJqh'){if(this[_0x4601d3(0x1d2)]===_0x54799a)this['initEventsMoveCore']();const _0x2cb200=_0x4601d3(0x2a4)['format'](_0x18cec,_0x3f1888);delete this[_0x4601d3(0x1d2)][_0x2cb200];}else VisuMZ[_0x4601d3(0x5b2)]['Game_Variables_setValue']['call'](this,_0x2e40c3,_0x270655);}else{const _0x21bbaa=[_0xc60a91[_0x4601d3(0x2c8)],_0xc60a91[_0x4601d3(0x1a9)],'Self\x20Variable\x20%1'[_0x4601d3(0x417)](_0x2e40c3)];$gameSelfSwitches[_0x4601d3(0x51a)](_0x21bbaa,_0x270655);}},Game_Variables['prototype'][_0x4cad34(0x5af)]=function(_0x5b0f7c,_0x413f5b){const _0x4d4ed9=_0x4cad34,_0x5abc82=$gameMap?$gameMap[_0x4d4ed9(0x574)]():0x0,_0x5a6231=[0x0,0x0,_0x4d4ed9(0x4ba)[_0x4d4ed9(0x417)](_0x5abc82,_0x5b0f7c)];$gameSelfSwitches['setValue'](_0x5a6231,_0x413f5b);},VisuMZ['EventsMoveCore'][_0x4cad34(0x34e)]=Game_SelfSwitches[_0x4cad34(0x3a4)][_0x4cad34(0x49f)],Game_SelfSwitches[_0x4cad34(0x3a4)]['value']=function(_0x4eff02){const _0x475b4f=_0x4cad34;if(_0x4eff02[0x2][_0x475b4f(0x12a)](/(?:SELF|MAP)/i)){if(_0x475b4f(0x3a3)==='yjIDA')return this[_0x475b4f(0x576)](_0x4eff02);else{let _0x49bcfc=_0xeb1d9d[_0x475b4f(0x5b2)][_0x475b4f(0x2f1)][_0x475b4f(0x4ac)][_0x475b4f(0x299)]?_0x55fff2:_0xbc8ffe;return this[_0x475b4f(0x554)](_0x49bcfc);}}else{if(_0x475b4f(0x41f)!==_0x475b4f(0x41f))this[_0x475b4f(0x285)]=_0x5f0070,this['_pageIndex']=-0x2,this[_0x475b4f(0x4d9)]();else{return VisuMZ['EventsMoveCore'][_0x475b4f(0x34e)]['call'](this,_0x4eff02);;}}},Game_SelfSwitches[_0x4cad34(0x3a4)][_0x4cad34(0x576)]=function(_0x213659){const _0x56276d=_0x4cad34;return _0x213659[0x2][_0x56276d(0x12a)](/VAR/i)?this[_0x56276d(0x57d)][_0x213659]||0x0:!!this[_0x56276d(0x57d)][_0x213659];},VisuMZ[_0x4cad34(0x5b2)]['Game_SelfSwitches_setValue']=Game_SelfSwitches[_0x4cad34(0x3a4)]['setValue'],Game_SelfSwitches['prototype']['setValue']=function(_0x19d2c6,_0x1043ad){const _0x436dd7=_0x4cad34;if(_0x19d2c6[0x2][_0x436dd7(0x12a)](/(?:SELF|MAP)/i)){if('TQJGG'!==_0x436dd7(0x59e)){const _0x1d6ed9=_0x5c924b['eventsXy'](_0x3c0da0,_0x435815);for(const _0x32339a of _0x1d6ed9){if(_0x32339a&&_0x32339a[_0x436dd7(0x5cc)]())return _0x32339a[_0x436dd7(0xfb)](),!![];}return![];}else this[_0x436dd7(0x353)](_0x19d2c6,_0x1043ad);}else _0x436dd7(0x14e)!=='lhxnD'?VisuMZ[_0x436dd7(0x5b2)]['Game_SelfSwitches_setValue'][_0x436dd7(0x24b)](this,_0x19d2c6,_0x1043ad):_0x32064e[_0x436dd7(0x5b2)][_0x436dd7(0x238)][_0x436dd7(0x46a)](_0x2da873);},Game_SelfSwitches[_0x4cad34(0x3a4)][_0x4cad34(0x353)]=function(_0x2202e8,_0x4a5ffe){const _0x1a8852=_0x4cad34;this['_data'][_0x2202e8]=_0x2202e8[0x2][_0x1a8852(0x12a)](/VAR/i)?_0x4a5ffe:!!_0x4a5ffe,this['onChange']();},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x4f5)]=Game_Enemy['prototype'][_0x4cad34(0x4a4)],Game_Enemy[_0x4cad34(0x3a4)][_0x4cad34(0x4a4)]=function(_0x471e98){const _0x3e64d=_0x4cad34;$gameTemp[_0x3e64d(0x280)](this);const _0x22ce43=VisuMZ[_0x3e64d(0x5b2)][_0x3e64d(0x4f5)][_0x3e64d(0x24b)](this,_0x471e98);return $gameTemp['clearSelfTarget'](),_0x22ce43;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x468)]=Game_Troop['prototype'][_0x4cad34(0x4f2)],Game_Troop['prototype'][_0x4cad34(0x4f2)]=function(_0x25a824){const _0x3ba575=_0x4cad34;$gameTemp['registerSelfTarget'](this);const _0x43547d=VisuMZ[_0x3ba575(0x5b2)][_0x3ba575(0x468)][_0x3ba575(0x24b)](this,_0x25a824);return $gameTemp[_0x3ba575(0xed)](),_0x43547d;},VisuMZ[_0x4cad34(0x5b2)]['Game_Map_setup']=Game_Map['prototype'][_0x4cad34(0x190)],Game_Map[_0x4cad34(0x3a4)]['setup']=function(_0x14c3f1){const _0x353389=_0x4cad34;this[_0x353389(0x31a)](_0x14c3f1),this[_0x353389(0x107)](),VisuMZ[_0x353389(0x5b2)][_0x353389(0x252)][_0x353389(0x24b)](this,_0x14c3f1),this['clearEventCache'](),this['setupDiagonalSupport'](),this[_0x353389(0x481)](),this[_0x353389(0x2cb)](),this[_0x353389(0x5e0)](),this[_0x353389(0x2d4)](),this[_0x353389(0x1dd)](),this[_0x353389(0x107)]();},VisuMZ['EventsMoveCore'][_0x4cad34(0x373)]=Game_Map['prototype'][_0x4cad34(0x131)],Game_Map['prototype'][_0x4cad34(0x131)]=function(){const _0xd8ed81=_0x4cad34;VisuMZ['EventsMoveCore']['Game_Map_setupEvents'][_0xd8ed81(0x24b)](this),this[_0xd8ed81(0x45d)]();},Game_Map[_0x4cad34(0x3a2)]=0xc8,Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x1cf)]=function(){const _0x5ce892=_0x4cad34,_0x267e01=Game_Map[_0x5ce892(0x3a2)];this[_0x5ce892(0x421)]=this[_0x5ce892(0x303)]()[_0x5ce892(0x207)]>_0x267e01;if(this[_0x5ce892(0x421)]&&$gameTemp[_0x5ce892(0x1e3)]()){}},Game_Map['prototype']['isEventOverloaded']=function(){const _0x1dd8bc=_0x4cad34;return this[_0x1dd8bc(0x421)];},Game_Map['prototype'][_0x4cad34(0x107)]=function(){const _0xdefc6e=_0x4cad34;this[_0xdefc6e(0x2b4)]=undefined;},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x5a9)]=function(){const _0x11fee0=_0x4cad34;this[_0x11fee0(0x387)]=VisuMZ[_0x11fee0(0x5b2)]['Settings']['Movement'][_0x11fee0(0x4d4)];const _0x4bd696=$dataMap[_0x11fee0(0x423)]||'';if(_0x4bd696[_0x11fee0(0x12a)](/<DIAGONAL MOVEMENT: ON>/i))'mrYQd'!==_0x11fee0(0x1c2)?this[_0x11fee0(0x387)]=!![]:this[_0x11fee0(0x5d3)]=![];else _0x4bd696[_0x11fee0(0x12a)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this['_diagonalSupport']=![]);},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x149)]=function(){const _0x5f2638=_0x4cad34,_0x54565a=$gameSystem[_0x5f2638(0x599)]();if(_0x54565a===_0x5f2638(0x1e2))return!![];if(_0x54565a===_0x5f2638(0x43b))return![];if(this['_diagonalSupport']===undefined)this[_0x5f2638(0x5a9)]();return this[_0x5f2638(0x387)];},Game_Map['prototype']['roundXWithDirection']=function(_0x24bced,_0x10c68e){const _0x31ce42=_0x4cad34;if([0x1,0x4,0x7]['includes'](_0x10c68e))_0x24bced-=0x1;if([0x3,0x6,0x9][_0x31ce42(0x165)](_0x10c68e))_0x24bced+=0x1;return this[_0x31ce42(0x41b)](_0x24bced);},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x39c)]=function(_0x149a8f,_0x20b814){const _0x5728c7=_0x4cad34;if([0x1,0x2,0x3]['includes'](_0x20b814))_0x149a8f+=0x1;if([0x7,0x8,0x9]['includes'](_0x20b814))_0x149a8f-=0x1;return this[_0x5728c7(0x137)](_0x149a8f);},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x31f)]=function(_0x320dc0,_0x4dadc8,_0x597114,_0xf7cd9b){const _0x1b9b66=_0x4cad34;return Math[_0x1b9b66(0x59d)](Math[_0x1b9b66(0x2f6)](this[_0x1b9b66(0x239)](_0x320dc0,_0x597114)),Math['abs'](this['deltaY'](_0x4dadc8,_0xf7cd9b)));},Game_Map['prototype'][_0x4cad34(0x481)]=function(){const _0x4bb5ad=_0x4cad34,_0xaba4b9=VisuMZ[_0x4bb5ad(0x5b2)]['Settings']['Region'],_0x303fb8={},_0x38fb24=[_0x4bb5ad(0x5f2),'Forbid',_0x4bb5ad(0x196)],_0x46092e=['All',_0x4bb5ad(0x333),'Player','Event',_0x4bb5ad(0x32a),'Boat',_0x4bb5ad(0x560),'Airship'];for(const _0x12a243 of _0x38fb24){if(_0x4bb5ad(0x5cd)!==_0x4bb5ad(0x5cd))this['startMapCommonEventOnOK'](this['x'],this['y']);else for(const _0x13a4cc of _0x46092e){const _0x12e6ce=_0x4bb5ad(0x33c)[_0x4bb5ad(0x417)](_0x13a4cc,_0x12a243);_0xaba4b9[_0x12e6ce]&&(_0x303fb8[_0x12e6ce]=_0xaba4b9[_0x12e6ce][_0x4bb5ad(0x465)](0x0));}}const _0x2f214d=$dataMap[_0x4bb5ad(0x423)]||'',_0x44a343=_0x2f214d['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x44a343){if('evCDm'!=='fKyMJ')for(const _0x2392f9 of _0x44a343){if(_0x4bb5ad(0x2ad)!=='DNThw'){_0x2392f9['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x2858ea=String(RegExp['$1'])['toLowerCase']()[_0x4bb5ad(0x2c6)](),_0x55b2a4=String(RegExp['$2'])[_0x4bb5ad(0x1f8)]()['trim']();const _0x214a6f=JSON['parse']('['+RegExp['$3'][_0x4bb5ad(0x12a)](/\d+/g)+']');_0x2858ea=_0x2858ea['charAt'](0x0)[_0x4bb5ad(0x5ca)]()+_0x2858ea[_0x4bb5ad(0x465)](0x1),_0x55b2a4=_0x55b2a4[_0x4bb5ad(0x19b)](0x0)[_0x4bb5ad(0x5ca)]()+_0x55b2a4[_0x4bb5ad(0x465)](0x1);const _0x32e738=_0x4bb5ad(0x33c)[_0x4bb5ad(0x417)](_0x2858ea,_0x55b2a4);if(_0x303fb8[_0x32e738])_0x303fb8[_0x32e738]=_0x303fb8[_0x32e738][_0x4bb5ad(0x292)](_0x214a6f);}else _0x453fae[_0x4bb5ad(0x5b2)]['Game_Map_refresh']['call'](this),this['checkNeedForPeriodicRefresh']();}else{const _0x5b2fef=_0x17ad1a[_0x4bb5ad(0x3d8)]('IconSet'),_0x2a7f0c=_0x3d49ac['iconWidth'],_0x111987=_0x36259e[_0x4bb5ad(0x2de)],_0x3c2828=_0x452e4a%0x10*_0x2a7f0c,_0x1f0388=_0x50883c['floor'](_0x3b173c/0x10)*_0x111987,_0x5cf190=_0x24cdcd['min'](this['iconSize']()),_0x4f4fb6=_0x472377[_0x4bb5ad(0x2e1)](this['iconSize']());this['contents'][_0x4bb5ad(0x1ff)](_0x5b2fef,_0x3c2828,_0x1f0388,_0x2a7f0c,_0x111987,_0x26f326,_0x47d3be,_0x5cf190,_0x4f4fb6);}}this[_0x4bb5ad(0x37d)]=_0x303fb8;},Game_Map['prototype']['isRegionAllowPass']=function(_0x499dfb,_0x1c916e,_0x39c19b,_0x9919d3){const _0x10cebe=_0x4cad34,_0x204926=this['roundXWithDirection'](_0x499dfb,_0x39c19b),_0x233945=this['roundYWithDirection'](_0x1c916e,_0x39c19b),_0x5ef0db=this[_0x10cebe(0x4bf)](_0x204926,_0x233945),_0x25d217=this[_0x10cebe(0x37d)];if(_0x25d217[_0x10cebe(0x3a9)][_0x10cebe(0x165)](_0x5ef0db))return!![];else{if(_0x9919d3==='player')return _0x25d217['PlayerAllow']['includes'](_0x5ef0db)||_0x25d217[_0x10cebe(0x1d1)]['includes'](_0x5ef0db);else{if(_0x9919d3===_0x10cebe(0x199))return _0x25d217['EventAllow'][_0x10cebe(0x165)](_0x5ef0db)||_0x25d217[_0x10cebe(0x1d1)][_0x10cebe(0x165)](_0x5ef0db);else{if(_0x25d217[_0x10cebe(0x507)]['includes'](_0x5ef0db))return!![];else{const _0x294100=_0x10cebe(0x22a)[_0x10cebe(0x417)](_0x9919d3[_0x10cebe(0x19b)](0x0)['toUpperCase']()+_0x9919d3[_0x10cebe(0x465)](0x1));if(_0x25d217[_0x294100])return _0x25d217[_0x294100][_0x10cebe(0x165)](_0x5ef0db);}}}}return![];},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x12d)]=function(_0x126598,_0x34e38f,_0x16cf37,_0xd340bc){const _0x5e2714=_0x4cad34,_0xb50140=this['roundXWithDirection'](_0x126598,_0x16cf37),_0x4d4c3a=this[_0x5e2714(0x39c)](_0x34e38f,_0x16cf37),_0xc5e79e=this[_0x5e2714(0x4bf)](_0xb50140,_0x4d4c3a),_0x433799=this['_regionRules'];if(_0x433799[_0x5e2714(0x2fe)]['includes'](_0xc5e79e))return!![];else{if(_0xd340bc===_0x5e2714(0x2da)){if('goqki'===_0x5e2714(0x548))return _0x433799[_0x5e2714(0x311)][_0x5e2714(0x165)](_0xc5e79e)||_0x433799['WalkForbid'][_0x5e2714(0x165)](_0xc5e79e);else{if(!_0x32b47b&&_0x5000c2['isEventRunning']())return![];if(!_0x9c5e20&&_0x2dbfab[_0x5e2714(0x5c1)]())return![];if([_0x5e2714(0x3bf),_0x5e2714(0x2c4)][_0x5e2714(0x165)](this[_0x5e2714(0x2ee)]()))return!![];return _0x5455b2[_0x5e2714(0x2a6)](this);}}else{if(_0xd340bc==='event')return _0x433799[_0x5e2714(0x388)][_0x5e2714(0x165)](_0xc5e79e)||_0x433799[_0x5e2714(0x437)]['includes'](_0xc5e79e);else{if(_0x433799['VehicleForbid'][_0x5e2714(0x165)](_0xc5e79e))return!![];else{const _0x54fe7e=_0x5e2714(0x326)[_0x5e2714(0x417)](_0xd340bc[_0x5e2714(0x19b)](0x0)[_0x5e2714(0x5ca)]()+_0xd340bc['slice'](0x1));if(_0x433799[_0x54fe7e])return _0x433799[_0x54fe7e][_0x5e2714(0x165)](_0xc5e79e);}}}}return![];},Game_Map[_0x4cad34(0x3a4)]['isRegionDockable']=function(_0x230eae,_0xe4ea39,_0x5f4640,_0x1f63b8){const _0x428d14=_0x4cad34;_0x5f4640=_0x1f63b8==='airship'?0x5:_0x5f4640;const _0x52ee4e=this[_0x428d14(0x3d4)](_0x230eae,_0x5f4640),_0x451c76=this[_0x428d14(0x39c)](_0xe4ea39,_0x5f4640),_0x2796af=this[_0x428d14(0x4bf)](_0x52ee4e,_0x451c76),_0x3d4e74=this[_0x428d14(0x37d)];if(_0x3d4e74[_0x428d14(0x1db)][_0x428d14(0x165)](_0x2796af))return!![];else{if('zIDyO'===_0x428d14(0x438)){const _0x454a93=_0x428d14(0x25e)['format'](_0x1f63b8[_0x428d14(0x19b)](0x0)[_0x428d14(0x5ca)]()+_0x1f63b8[_0x428d14(0x465)](0x1));if(_0x3d4e74[_0x454a93])return _0x3d4e74[_0x454a93][_0x428d14(0x165)](_0x2796af);}else return this[_0x428d14(0x2ed)](0x2,_0x5a72cc(_0xb80318['$1']));}return![];},VisuMZ[_0x4cad34(0x5b2)]['Game_Map_refresh']=Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x4d9)],Game_Map[_0x4cad34(0x3a4)]['refresh']=function(){const _0x4d7681=_0x4cad34;VisuMZ['EventsMoveCore'][_0x4d7681(0x2ce)][_0x4d7681(0x24b)](this),this[_0x4d7681(0x50f)]();},Game_Map[_0x4cad34(0x3a4)]['checkNeedForPeriodicRefresh']=function(){const _0x88640c=_0x4cad34;this[_0x88640c(0x30d)]=![];if(this['events']()[_0x88640c(0x3b9)](_0x363872=>_0x363872[_0x88640c(0x444)]())){this[_0x88640c(0x30d)]=!![];return;}if(this['events']()[_0x88640c(0x3b9)](_0x40acd0=>_0x40acd0[_0x88640c(0x205)]())){if(_0x88640c(0x2b9)===_0x88640c(0x2b9)){this['_needsPeriodicRefresh']=!![];return;}else _0x24bc1e*=_0x24e393[_0x88640c(0x4e5)]||0.01;}if(this['_commonEvents'][_0x88640c(0x3b9)](_0x66f49f=>_0x66f49f[_0x88640c(0x444)]())){if(_0x88640c(0x2eb)===_0x88640c(0x2eb)){this[_0x88640c(0x30d)]=!![];return;}else this['_DisablePlayerControl']=_0x48be81;}if(this['_commonEvents'][_0x88640c(0x3b9)](_0x17a371=>_0x17a371['hasCPCs']())){if(_0x88640c(0x3f5)!==_0x88640c(0x2c5)){this[_0x88640c(0x30d)]=!![];return;}else{if(this[_0x88640c(0x3d5)](this['x'],this['y'],_0x501f3f))_0x24433a['push'](_0x131246);}}},VisuMZ[_0x4cad34(0x5b2)]['Game_Map_update']=Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x3ee)],Game_Map['prototype']['update']=function(_0x29212e){const _0x481dd9=_0x4cad34;this[_0x481dd9(0x314)](),VisuMZ[_0x481dd9(0x5b2)]['Game_Map_update'][_0x481dd9(0x24b)](this,_0x29212e);},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x314)]=function(){const _0x203a41=_0x4cad34;if(!this[_0x203a41(0x30d)])return;this['_periodicRefreshTimer']=this['_periodicRefreshTimer']||0x3c,this[_0x203a41(0x4dc)]--;if(this[_0x203a41(0x4dc)]<=0x0){if(_0x203a41(0x566)==='zQbyQ')this[_0x203a41(0x48c)](),this[_0x203a41(0x4dc)]=0x3c;else{if([0x2,0x4,0x6,0x8][_0x203a41(0x165)](_0x538da8))return 0x4;if([0x1,0x3,0x7,0x9][_0x203a41(0x165)](_0x1a96fa))return 0x5;}}},VisuMZ['EventsMoveCore'][_0x4cad34(0x323)]=Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x317)],Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x317)]=function(){const _0x359b16=_0x4cad34;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ[_0x359b16(0x5b2)][_0x359b16(0x323)]['call'](this);},Game_Map[_0x4cad34(0x3a4)]['setupSaveEventLocations']=function(){const _0xbe71b=_0x4cad34;this[_0xbe71b(0x5ab)]=![];const _0xecc7fa=$dataMap[_0xbe71b(0x423)]||'';_0xecc7fa['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0xbe71b(0x5ab)]=!![]);},Game_Map['prototype'][_0x4cad34(0x124)]=function(){const _0x219dbb=_0x4cad34;if(this['_saveEventLocations']===undefined)this[_0x219dbb(0x2cb)]();return this[_0x219dbb(0x5ab)];},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x31a)]=function(_0x2eec0a){const _0x9c277e=_0x4cad34;if(_0x2eec0a!==this[_0x9c277e(0x574)]()&&$gamePlayer){if(_0x9c277e(0x322)===_0x9c277e(0x5a1))return this[_0x9c277e(0x324)]=![];else $gameSystem[_0x9c277e(0x31a)](this[_0x9c277e(0x574)]());}},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x5e0)]=function(){const _0x5e0fdd=_0x4cad34;this[_0x5e0fdd(0x23d)]=$gameSystem[_0x5e0fdd(0x4da)](this[_0x5e0fdd(0x574)]()),this['_needsRefresh']=!![];},VisuMZ['EventsMoveCore'][_0x4cad34(0x143)]=Game_Map[_0x4cad34(0x3a4)]['events'],Game_Map['prototype']['events']=function(){const _0x5a4206=_0x4cad34;if(this[_0x5a4206(0x2b4)])return this['_eventCache'];const _0xe3a354=VisuMZ['EventsMoveCore'][_0x5a4206(0x143)][_0x5a4206(0x24b)](this),_0x342bff=_0xe3a354[_0x5a4206(0x292)](this[_0x5a4206(0x23d)]||[]);return this[_0x5a4206(0x2b4)]=_0x342bff[_0x5a4206(0x375)](_0x2b476c=>!!_0x2b476c),this[_0x5a4206(0x2b4)];},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x4c5)]=Game_Map[_0x4cad34(0x3a4)]['event'],Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x199)]=function(_0x1d2e1c){const _0x32165f=_0x4cad34;return _0x1d2e1c>=0x3e8?(_0x1d2e1c-=0x3e8,this[_0x32165f(0x23d)][_0x1d2e1c]):'xGmbg'===_0x32165f(0x5ba)?this[_0x32165f(0x1c0)]():VisuMZ[_0x32165f(0x5b2)][_0x32165f(0x4c5)][_0x32165f(0x24b)](this,_0x1d2e1c);},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x3d6)]=function(_0x225817){const _0x2493ce=_0x4cad34,_0x43c8f3=this[_0x2493ce(0x199)](_0x225817);if(_0x43c8f3)_0x43c8f3[_0x2493ce(0x509)]();},Game_Map['prototype'][_0x4cad34(0x4c2)]=function(){const _0x5bf4c5=_0x4cad34,_0x392453={'template':_0x5bf4c5(0x49a),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x5bf4c5(0x23d)][_0x5bf4c5(0x207)]+0x3e8};this['createSpawnedEventWithData'](_0x392453);},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0xfa)]=function(_0x248230,_0x2a68d0){const _0x244d5a=_0x4cad34;if(this[_0x244d5a(0x313)](_0x248230,_0x2a68d0)[_0x244d5a(0x207)]>0x0)return!![];if($gamePlayer['x']===_0x248230&&$gamePlayer['y']===_0x2a68d0)return!![];if(this[_0x244d5a(0x161)]()['posNt'](_0x248230,_0x2a68d0))return!![];if(this[_0x244d5a(0x3a8)]()[_0x244d5a(0x1ed)](_0x248230,_0x2a68d0))return!![];return![];},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x2e9)]=function(_0x17f2c7,_0x1fa147,_0x1ecfd3){const _0x31de54=_0x4cad34;$gameTemp[_0x31de54(0x32c)]=_0x17f2c7;const _0x4d0900=new Game_Event(_0x17f2c7[_0x31de54(0x574)],_0x17f2c7['eventId']);$gameTemp[_0x31de54(0x32c)]=undefined,_0x4d0900[_0x31de54(0x4d9)]();let _0xea6045=_0x1fa147-_0x4d0900[_0x31de54(0x3fc)][_0x31de54(0x424)],_0x4458e0=_0x1fa147+_0x4d0900[_0x31de54(0x3fc)]['left'],_0x33bae8=_0x1ecfd3-_0x4d0900[_0x31de54(0x3fc)]['up'],_0xdcbc31=_0x1ecfd3+_0x4d0900[_0x31de54(0x3fc)][_0x31de54(0x18a)];for(let _0xf6c7de=_0xea6045;_0xf6c7de<=_0x4458e0;_0xf6c7de++){for(let _0x58cda5=_0x33bae8;_0x58cda5<=_0xdcbc31;_0x58cda5++){if(this['checkExistingEntitiesAt'](_0xf6c7de,_0x58cda5))return![];}}return!![];},Game_Map['prototype'][_0x4cad34(0x4b8)]=function(_0x596e85){const _0x352e63=_0x4cad34;$gameTemp[_0x352e63(0x32c)]=_0x596e85;const _0x5eae01=new Game_Event(_0x596e85[_0x352e63(0x574)],_0x596e85[_0x352e63(0x477)]);$gameTemp[_0x352e63(0x32c)]=undefined,this[_0x352e63(0x23d)][_0x352e63(0x3c4)](_0x5eae01),_0x5eae01[_0x352e63(0x2f3)](_0x596e85),this[_0x352e63(0x107)]();},Game_Map['prototype']['prepareSpawnedEventAtXY']=function(_0x3dde90,_0x4e88d4,_0x5cf93e){const _0x4852c6=_0x4cad34,_0x2626cd=_0x3dde90[_0x4852c6(0x5d8)][_0x4852c6(0x5ca)]()[_0x4852c6(0x2c6)]();if(_0x2626cd!==_0x4852c6(0x1bd)){const _0x2dfb50=VisuMZ[_0x4852c6(0x389)][_0x2626cd];if(_0x2dfb50){if('rWphK'===_0x4852c6(0x371))_0x3dde90[_0x4852c6(0x574)]=_0x2dfb50['MapID'],_0x3dde90[_0x4852c6(0x477)]=_0x2dfb50[_0x4852c6(0x1e8)];else{let _0xfbe333=this[_0x4852c6(0x501)][_0x4852c6(0x2a1)]();if(this[_0x4852c6(0x501)][_0x4852c6(0x470)]){if(_0xfbe333===0x4)_0xfbe333=0x6;else _0xfbe333===0x6&&(_0xfbe333=0x4);}return(_0xfbe333-0x2)/0x2;}}}const _0x4f02e9=_0x3dde90['x'],_0x57ddfb=_0x3dde90['y'];if(!this[_0x4852c6(0x1a3)](_0x4f02e9,_0x57ddfb))return![];if(_0x4e88d4){if(this[_0x4852c6(0xfa)](_0x4f02e9,_0x57ddfb))return![];if(!this[_0x4852c6(0x2e9)](_0x3dde90,_0x4f02e9,_0x57ddfb))return![];}if(_0x5cf93e){if(!this['isPassableByAnyDirection'](_0x4f02e9,_0x57ddfb))return![];}return this['createSpawnedEventWithData'](_0x3dde90),!![];},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x183)]=function(_0x1f17c6,_0x124b9c,_0x4daa52,_0x38e7e9){const _0x42736d=_0x4cad34,_0x3a8fdc=[],_0x1cc1af=this[_0x42736d(0x578)](),_0x44843f=this[_0x42736d(0x30f)]();for(let _0x242065=0x0;_0x242065<_0x1cc1af;_0x242065++){for(let _0x189f61=0x0;_0x189f61<_0x44843f;_0x189f61++){if(!_0x124b9c[_0x42736d(0x165)](this[_0x42736d(0x4bf)](_0x242065,_0x189f61)))continue;if(!this['isValid'](_0x242065,_0x189f61))continue;if(_0x4daa52){if(this[_0x42736d(0xfa)](_0x242065,_0x189f61))continue;if(!this[_0x42736d(0x2e9)](_0x1f17c6,_0x242065,_0x189f61))continue;}if(_0x38e7e9){if(!this['isPassableByAnyDirection'](_0x242065,_0x189f61))continue;}_0x3a8fdc[_0x42736d(0x3c4)]([_0x242065,_0x189f61]);}}if(_0x3a8fdc[_0x42736d(0x207)]>0x0){if('Tzzab'!=='TByux'){const _0x125ddf=_0x3a8fdc[Math[_0x42736d(0x4fe)](_0x3a8fdc[_0x42736d(0x207)])];return _0x1f17c6['x']=_0x125ddf[0x0],_0x1f17c6['y']=_0x125ddf[0x1],this['createSpawnedEventWithData'](_0x1f17c6),!![];}else{if(_0x3532fd===0x1)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x57f1b1===0x3)return this[_0x42736d(0x3d5)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x3e5340===0x7)return this[_0x42736d(0x3d5)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x289f5c===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x579ead;}}return![];},Game_Map['prototype'][_0x4cad34(0x1fc)]=function(_0x45bde3,_0x34b562,_0x36134e,_0x4f2ddd){const _0x461726=_0x4cad34,_0x5390a9=[],_0x3a90ac=this[_0x461726(0x578)](),_0x3868d1=this['height']();for(let _0x51eb57=0x0;_0x51eb57<_0x3a90ac;_0x51eb57++){if(_0x461726(0x13e)===_0x461726(0x13e))for(let _0x3fef62=0x0;_0x3fef62<_0x3868d1;_0x3fef62++){if(!_0x34b562[_0x461726(0x165)](this['terrainTag'](_0x51eb57,_0x3fef62)))continue;if(!this[_0x461726(0x1a3)](_0x51eb57,_0x3fef62))continue;if(_0x36134e){if(_0x461726(0x516)!==_0x461726(0x516)){if(!_0x4aaec1[_0x461726(0x5b2)]['Settings'][_0x461726(0x4ac)][_0x461726(0x5e3)])return;this[_0x461726(0x3c1)]=0x0;if(this[_0x461726(0x159)]()){const _0x1fb591=_0x162c02[_0x461726(0x5b2)]['Settings'][_0x461726(0x4ac)],_0x52433c=this[_0x461726(0x501)][_0x461726(0x2a1)]();let _0x120898=0x0;if([0x1,0x4,0x7][_0x461726(0x165)](_0x52433c))_0x120898=_0x1fb591[_0x461726(0x116)];if([0x3,0x6,0x9][_0x461726(0x165)](_0x52433c))_0x120898=_0x1fb591[_0x461726(0x3c0)];[0x2,0x8]['includes'](_0x52433c)&&(_0x120898=[-_0x1fb591[_0x461726(0x19c)],0x0,_0x1fb591['TiltVert']][this['_character'][_0x461726(0x1f4)]()]);if(this[_0x461726(0x276)])_0x120898*=-0x1;this[_0x461726(0x3c1)]=_0x120898;}}else{if(this[_0x461726(0xfa)](_0x51eb57,_0x3fef62))continue;if(!this['isSpawnHitboxCollisionOk'](_0x45bde3,_0x51eb57,_0x3fef62))continue;}}if(_0x4f2ddd){if(!this[_0x461726(0x119)](_0x51eb57,_0x3fef62))continue;}_0x5390a9[_0x461726(0x3c4)]([_0x51eb57,_0x3fef62]);}else{const _0x220ed4=_0x4fd74b[_0x461726(0x33a)](this[_0x461726(0x349)]()),_0x25b4bb=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x220ed4[_0x461726(0x2b7)]()];this[_0x461726(0x1be)](_0x25b4bb);}}if(_0x5390a9[_0x461726(0x207)]>0x0){const _0x16466e=_0x5390a9[Math[_0x461726(0x4fe)](_0x5390a9[_0x461726(0x207)])];return _0x45bde3['x']=_0x16466e[0x0],_0x45bde3['y']=_0x16466e[0x1],this[_0x461726(0x4b8)](_0x45bde3),!![];}return![];},Game_Map['prototype'][_0x4cad34(0x119)]=function(_0x56f7c9,_0x3c59bb){const _0x4f7e49=_0x4cad34;if(this[_0x4f7e49(0x37e)](_0x56f7c9,_0x3c59bb,0x2))return!![];if(this['isPassable'](_0x56f7c9,_0x3c59bb,0x4))return!![];if(this[_0x4f7e49(0x37e)](_0x56f7c9,_0x3c59bb,0x6))return!![];if(this[_0x4f7e49(0x37e)](_0x56f7c9,_0x3c59bb,0x8))return!![];return![];},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x524)]=function(_0x5bc1d8){const _0x59c541=_0x4cad34;if(_0x5bc1d8<0x3e8)return;if(!this[_0x59c541(0x23d)])return;const _0x154d41=this['event'](_0x5bc1d8);_0x154d41['locate'](-0x1,-0x1),_0x154d41[_0x59c541(0x509)](),this['_spawnedEvents'][_0x5bc1d8-0x3e8]=null,this['clearEventCache']();},Game_Map[_0x4cad34(0x3a4)]['firstSpawnedEvent']=function(){for(const _0x19e36b of this['_spawnedEvents']){if(_0x19e36b)return _0x19e36b;}return null;},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x3e3)]=function(){const _0x56ac31=_0x4cad34,_0x405143=this[_0x56ac31(0x581)]();return _0x405143?_0x405143[_0x56ac31(0x1a9)]:0x0;},Game_Map['prototype'][_0x4cad34(0x512)]=function(){const _0x23f761=_0x4cad34,_0x1db1dd=this[_0x23f761(0x23d)][_0x23f761(0x465)](0x0)['reverse']();for(const _0x1989a7 of _0x1db1dd){if('eUhGn'===_0x23f761(0x2b3)){if(_0x1989a7)return _0x1989a7;}else{const _0x3c9ebc=this['_randomHomeX'],_0x1fe313=this[_0x23f761(0x575)];return this[_0x23f761(0x4f1)](_0x3c9ebc,_0x1fe313);}}return null;},Game_Map['prototype'][_0x4cad34(0x342)]=function(){const _0x479213=_0x4cad34,_0xbce51e=this[_0x479213(0x512)]();return _0xbce51e?_0xbce51e['_eventId']:0x0;},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x570)]=function(_0x46acba,_0x5904e9){const _0x236c8e=_0x4cad34,_0x4d3668=this[_0x236c8e(0x313)](_0x46acba,_0x5904e9);for(const _0x134ef3 of _0x4d3668){if(!_0x134ef3)continue;if(_0x134ef3[_0x236c8e(0x26a)]())this[_0x236c8e(0x524)](_0x134ef3['_eventId']);}},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x458)]=function(_0x1b136a){const _0x1d14d5=_0x4cad34;for(const _0x47934f of this['_spawnedEvents']){if(!_0x47934f)continue;_0x1b136a[_0x1d14d5(0x165)](_0x47934f[_0x1d14d5(0x4bf)]())&&this['despawnEventId'](_0x47934f['_eventId']);}},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x563)]=function(_0x5350e2){const _0x4b9141=_0x4cad34;for(const _0x39e596 of this[_0x4b9141(0x23d)]){if(_0x4b9141(0x457)===_0x4b9141(0x457)){if(!_0x39e596)continue;_0x5350e2[_0x4b9141(0x165)](_0x39e596[_0x4b9141(0x4ce)]())&&this[_0x4b9141(0x524)](_0x39e596['_eventId']);}else return this[_0x4b9141(0x302)]();}},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x5c9)]=function(){const _0x41d812=_0x4cad34;for(const _0x2f688d of this['_spawnedEvents']){if(!_0x2f688d)continue;this[_0x41d812(0x524)](_0x2f688d['_eventId']);}},VisuMZ['EventsMoveCore'][_0x4cad34(0x1bb)]=Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x2aa)],Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x2aa)]=function(_0xe4c68c){const _0x302968=_0x4cad34;VisuMZ[_0x302968(0x5b2)]['Game_Map_unlockEvent'][_0x302968(0x24b)](this,_0xe4c68c);if(_0xe4c68c>=0x3e8){if(_0x302968(0x4f4)!==_0x302968(0x4bc)){const _0x142587=this[_0x302968(0x199)](_0xe4c68c);if(_0x142587)_0x142587[_0x302968(0x441)]();}else return this[_0x302968(0x421)];}},Game_Map['prototype']['setupPlayerVisibilityOverrides']=function(){const _0x1c695=_0x4cad34;this[_0x1c695(0x178)]=![],this[_0x1c695(0x4b9)]=![];if(!$dataMap)return;const _0x441dd4=$dataMap[_0x1c695(0x423)]||'';if(_0x441dd4[_0x1c695(0x12a)](/<HIDE PLAYER>/i))this[_0x1c695(0x178)]=![],this[_0x1c695(0x4b9)]=!![];else _0x441dd4['match'](/<SHOW PLAYER>/i)&&(this[_0x1c695(0x178)]=!![],this[_0x1c695(0x4b9)]=![]);},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x5c2)]=function(){const _0x4686c1=_0x4cad34;return this[_0x4686c1(0x178)]===undefined&&this['setupPlayerVisibilityOverrides'](),this[_0x4686c1(0x178)];},Game_Map['prototype'][_0x4cad34(0x543)]=function(){const _0x2d40eb=_0x4cad34;return this[_0x2d40eb(0x4b9)]===undefined&&this[_0x2d40eb(0x2d4)](),this['_forceHidePlayer'];},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x408)]=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x1ac)],Game_CharacterBase['prototype']['isTransparent']=function(){const _0x61a2c0=_0x4cad34;if(this===$gamePlayer){if(_0x61a2c0(0x15d)!==_0x61a2c0(0x15d))this[_0x61a2c0(0x3f2)](_0xd85d62,!![]);else{if($gameMap[_0x61a2c0(0x5c2)]())return![];if($gameMap[_0x61a2c0(0x543)]())return!![];}}return VisuMZ[_0x61a2c0(0x5b2)][_0x61a2c0(0x408)][_0x61a2c0(0x24b)](this);},Game_Map['prototype'][_0x4cad34(0x1dd)]=function(){const _0x1aaa8a=_0x4cad34;this['_forceShowFollower']=![],this[_0x1aaa8a(0x4a8)]=![];if(!$dataMap)return;const _0x505317=$dataMap[_0x1aaa8a(0x423)]||'';if(_0x505317[_0x1aaa8a(0x12a)](/<HIDE FOLLOWERS>/i)){if(_0x1aaa8a(0x316)!=='CkWMB')this['_forceShowFollower']=![],this['_forceHideFollower']=!![];else{const _0x3a913b=_0x259c6c(_0xcff7f3['$1']);if(_0x3a913b[_0x1aaa8a(0x12a)](/PLAYER/i))this[_0x1aaa8a(0x2d7)][_0x1aaa8a(0x580)]=0x0;else _0x3a913b[_0x1aaa8a(0x12a)](/EVENT[ ](\d+)/i)&&(this[_0x1aaa8a(0x2d7)]['target']=_0x184282(_0x3ac964['$1']));}}else _0x505317['match'](/<SHOW FOLLOWERS>/i)&&(this[_0x1aaa8a(0x4a0)]=!![],this[_0x1aaa8a(0x4a8)]=![]);},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x56d)]=function(){const _0xb37892=_0x4cad34;return this[_0xb37892(0x4a0)]===undefined&&this[_0xb37892(0x1dd)](),this[_0xb37892(0x4a0)];},Game_Map['prototype'][_0x4cad34(0x40d)]=function(){const _0x194409=_0x4cad34;return this['_forceHideFollower']===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x194409(0x4a8)];},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x4e9)]=Game_Followers[_0x4cad34(0x3a4)][_0x4cad34(0x3d1)],Game_Followers[_0x4cad34(0x3a4)][_0x4cad34(0x3d1)]=function(){const _0x536a5a=_0x4cad34;if($gameMap[_0x536a5a(0x56d)]())return!![];if($gameMap[_0x536a5a(0x40d)]())return![];return VisuMZ['EventsMoveCore'][_0x536a5a(0x4e9)]['call'](this);},Game_CommonEvent[_0x4cad34(0x3a4)][_0x4cad34(0x444)]=function(){const _0x3228f3=_0x4cad34,_0x4262d9=this['event']();return this[_0x3228f3(0x250)]()&&_0x4262d9['trigger']>=0x1&&DataManager[_0x3228f3(0x4cb)](_0x4262d9[_0x3228f3(0x242)]);},Game_CommonEvent['prototype']['hasCPCs']=function(){const _0x51443d=_0x4cad34;return VisuMZ[_0x51443d(0x5b2)][_0x51443d(0x238)][_0x51443d(0x1a2)][_0x51443d(0x165)](this[_0x51443d(0x209)]);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x370)]=Game_CommonEvent[_0x4cad34(0x3a4)][_0x4cad34(0x250)],Game_CommonEvent[_0x4cad34(0x3a4)][_0x4cad34(0x250)]=function(){const _0x527120=_0x4cad34;if(VisuMZ[_0x527120(0x5b2)][_0x527120(0x370)][_0x527120(0x24b)](this)){if(_0x527120(0x5a8)===_0x527120(0x4a7))this[_0x527120(0x1f3)]=this[_0x527120(0x4ab)][_0x527120(0x3f6)](),this[_0x527120(0x4d9)]();else return!![];}else{if('BSdFd'===_0x527120(0x397)){for(let _0xaa53a0=0x1;_0xaa53a0<_0x271431[_0x527120(0x58b)][_0x527120(0x207)];_0xaa53a0++){if(_0x3d1345[_0x527120(0x58b)][_0xaa53a0][_0x527120(0x12a)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x16f9a7[_0x527120(0x4cd)][_0x527120(0x3c4)](_0xaa53a0);if(_0x4cfb55[_0x527120(0x58b)][_0xaa53a0][_0x527120(0x12a)](/<SELF>/i))_0x25c1dd[_0x527120(0x490)][_0x527120(0x3c4)](_0xaa53a0);if(_0x3ace86[_0x527120(0x58b)][_0xaa53a0][_0x527120(0x12a)](/<MAP>/i))_0x1f634e[_0x527120(0x5b3)][_0x527120(0x3c4)](_0xaa53a0);}for(let _0x2989bd=0x1;_0x2989bd<_0x2d08f7[_0x527120(0x249)][_0x527120(0x207)];_0x2989bd++){if(_0x368ebe['variables'][_0x2989bd][_0x527120(0x12a)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x3b322b['AdvancedVariables']['push'](_0x2989bd);if(_0x5ed064[_0x527120(0x249)][_0x2989bd][_0x527120(0x12a)](/<SELF>/i))_0x3c9b19[_0x527120(0x16e)][_0x527120(0x3c4)](_0x2989bd);if(_0x251f49[_0x527120(0x249)][_0x2989bd][_0x527120(0x12a)](/<MAP>/i))_0x385b27[_0x527120(0x139)][_0x527120(0x3c4)](_0x2989bd);}}else return VisuMZ[_0x527120(0x5b2)][_0x527120(0x238)][_0x527120(0x1ae)](this['event']()[_0x527120(0x5fe)],this['_commonEventId']);}},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x460)]=Game_Map[_0x4cad34(0x3a4)]['parallelCommonEvents'],Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x277)]=function(){const _0x109c8b=_0x4cad34,_0x4d163a=VisuMZ[_0x109c8b(0x5b2)][_0x109c8b(0x460)]['call'](this),_0x2d6459=VisuMZ[_0x109c8b(0x5b2)][_0x109c8b(0x238)]['_commonEvents'][_0x109c8b(0x312)](_0x1243a5=>$dataCommonEvents[_0x1243a5]);return _0x4d163a[_0x109c8b(0x292)](_0x2d6459)[_0x109c8b(0x375)]((_0x1c9c86,_0x15114b,_0x293df6)=>_0x293df6[_0x109c8b(0x1c6)](_0x1c9c86)===_0x15114b);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x51c)]=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x57f)],Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x57f)]=function(){const _0x42d762=_0x4cad34;VisuMZ[_0x42d762(0x5b2)]['Game_CharacterBase_initMembers'][_0x42d762(0x24b)](this),this['initEventsMoveCoreSettings']();},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x21e)]=function(){const _0x403a9f=_0x4cad34;this['_patternLocked']=![],this[_0x403a9f(0x29a)](),this['clearDashing'](),this['clearSpriteOffsets'](),this[_0x403a9f(0x364)]();},VisuMZ[_0x4cad34(0x5b2)]['Game_CharacterBase_opacity']=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x166)],Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x166)]=function(){const _0x325400=_0x4cad34;let _0x364b25=VisuMZ[_0x325400(0x5b2)]['Game_CharacterBase_opacity'][_0x325400(0x24b)](this);return _0x364b25=this[_0x325400(0x506)](_0x364b25),_0x364b25;},Game_CharacterBase['prototype']['adjustMoveSynchOpacityDelta']=function(_0x4d8e01){return _0x4d8e01;},Game_CharacterBase['prototype'][_0x4cad34(0x558)]=function(){const _0x4d8c31=_0x4cad34;if(this[_0x4d8c31(0x35d)]===Game_Player&&this[_0x4d8c31(0x3be)]())return this[_0x4d8c31(0x463)]()['characterName']()[_0x4d8c31(0x12a)](/\[VS8\]/i);else{if(Imported[_0x4d8c31(0x179)]&&this['hasDragonbones']())return!![];else{if('lGfWE'!==_0x4d8c31(0x2f9))_0x1c0e81['ConvertParams'](_0x107c54,_0x1eebba),_0x2e875b[_0x4d8c31(0x1a6)](_0x4cf6f8[_0x4d8c31(0x13f)]);else return this['characterName']()[_0x4d8c31(0x12a)](/\[VS8\]/i);}}},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x2c2)]=Game_CharacterBase['prototype'][_0x4cad34(0x2a1)],Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x2a1)]=function(){const _0xdd2feb=_0x4cad34;if(!$dataMap)return this[_0xdd2feb(0x4df)]||0x2;if(this[_0xdd2feb(0x480)]()&&!this[_0xdd2feb(0x3e1)]()&&this['isSpriteVS8dir']()){if('VNxql'!==_0xdd2feb(0x2e7)){let _0x1d6f03=this[_0xdd2feb(0x301)];return this[_0xdd2feb(0x4be)]()&&(_0x1d6f03+=this[_0xdd2feb(0x4eb)]()),this[_0xdd2feb(0x3c7)](_0x1d6f03);}else return this['directionOnLadderSpriteVS8dir']();}else{if(this['isOnLadder']()&&!this[_0xdd2feb(0x3e1)]())return 0x8;else{if(this[_0xdd2feb(0x3de)]()&&this[_0xdd2feb(0x558)]())return this[_0xdd2feb(0x1da)]();else{if('phMIy'===_0xdd2feb(0x2bb))return VisuMZ[_0xdd2feb(0x5b2)][_0xdd2feb(0x2c2)][_0xdd2feb(0x24b)](this);else _0x22ea26[_0xdd2feb(0x180)]();}}}},VisuMZ['EventsMoveCore']['Game_CharacterBase_setDirection']=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x376)],Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x376)]=function(_0x1fb0c4){const _0x5b6182=_0x4cad34;if(!this[_0x5b6182(0x558)]())_0x1fb0c4=this['correctFacingDirection'](_0x1fb0c4);VisuMZ[_0x5b6182(0x5b2)][_0x5b6182(0x113)][_0x5b6182(0x24b)](this,_0x1fb0c4);},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x1d5)]=function(_0x6fb033){const _0x4b2f5f=_0x4cad34;if(_0x6fb033===0x1)return this[_0x4b2f5f(0x3d5)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x6fb033===0x3)return this[_0x4b2f5f(0x3d5)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x6fb033===0x7)return this[_0x4b2f5f(0x3d5)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x6fb033===0x9)return this[_0x4b2f5f(0x3d5)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x6fb033;},Game_CharacterBase['prototype']['isDiagonalDirection']=function(_0x18de32){return[0x1,0x3,0x5,0x7,0x9]['includes'](_0x18de32);},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x2b7)]=function(){const _0x3be91f=_0x4cad34;return this[_0x3be91f(0x1ad)]||0x0;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x1a5)]=Game_CharacterBase[_0x4cad34(0x3a4)]['moveStraight'],Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x554)]=function(_0x2759fd){const _0xe71195=_0x4cad34;this[_0xe71195(0x1ad)]=_0x2759fd,VisuMZ[_0xe71195(0x5b2)][_0xe71195(0x1a5)][_0xe71195(0x24b)](this,_0x2759fd);},Game_CharacterBase['prototype'][_0x4cad34(0x1be)]=function(_0x5a6919){const _0x462a71=_0x4cad34;if(!this[_0x462a71(0x273)](_0x5a6919))return this[_0x462a71(0x554)](_0x5a6919);let _0x34c393=0x0,_0x1023e6=0x0;switch(_0x5a6919){case 0x1:_0x34c393=0x4,_0x1023e6=0x2;break;case 0x3:_0x34c393=0x6,_0x1023e6=0x2;break;case 0x7:_0x34c393=0x4,_0x1023e6=0x8;break;case 0x9:_0x34c393=0x6,_0x1023e6=0x8;break;}if(VisuMZ[_0x462a71(0x5b2)][_0x462a71(0x2f1)][_0x462a71(0x4ac)][_0x462a71(0x110)]){if(_0x462a71(0x358)===_0x462a71(0x358)){if(!this[_0x462a71(0x3d5)](this['_x'],this['_y'],_0x34c393))return this['moveStraight'](_0x1023e6);if(!this['canPass'](this['_x'],this['_y'],_0x1023e6)){if(_0x462a71(0x415)===_0x462a71(0x16b))this['_spriteOffsetX']=_0x303a87(_0x42f96e['$1']),this[_0x462a71(0x2a3)]=_0x2df208(_0x24b63b['$2']);else return this[_0x462a71(0x554)](_0x34c393);}if(!this[_0x462a71(0x4c3)](this['_x'],this['_y'],_0x34c393,_0x1023e6)){if('rKEda'!==_0x462a71(0x1ab)){const _0xd65185=_0xd95df0(_0x4321c1['$1'])['toUpperCase']()['trim']();_0x36fae0=_0xd9fef2[_0x462a71(0x389)][_0xd65185];if(!_0x40d3dd)return;_0x4cafc3=_0x35b9d3[_0x462a71(0x20c)],_0x3009a5=_0x19f44b[_0x462a71(0x1e8)];}else{let _0x45a8d4=VisuMZ[_0x462a71(0x5b2)][_0x462a71(0x2f1)][_0x462a71(0x4ac)][_0x462a71(0x299)]?_0x34c393:_0x1023e6;return this[_0x462a71(0x554)](_0x45a8d4);}}}else _0x16fb97[_0x462a71(0x5b2)][_0x462a71(0x2ec)]['call'](this,_0x276852,_0x220844),_0x4018ec[_0x462a71(0x5b2)]['Settings'][_0x462a71(0x555)][_0x462a71(0x2d2)]&&this[_0x462a71(0x5be)][_0x462a71(0x501)][_0x462a71(0x213)](_0x5f2380,this[_0x462a71(0x54e)]);}this['_lastMovedDirection']=_0x5a6919,this[_0x462a71(0x221)](_0x34c393,_0x1023e6);},VisuMZ['EventsMoveCore'][_0x4cad34(0x2fb)]=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x4b2)],Game_CharacterBase['prototype']['realMoveSpeed']=function(){const _0x30f445=_0x4cad34;let _0x1e974e=this[_0x30f445(0x301)];return this[_0x30f445(0x4be)]()&&(_0x1e974e+=this[_0x30f445(0x4eb)]()),this['adjustDir8MovementSpeed'](_0x1e974e);},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x4eb)]=function(){const _0xc774c9=_0x4cad34,_0x27851c=VisuMZ[_0xc774c9(0x5b2)][_0xc774c9(0x2f1)][_0xc774c9(0x4ac)];if(_0x27851c[_0xc774c9(0x1d7)]!==undefined){if('iZtdy'==='elaDy'){const _0x1b09ed=_0xe210ac[_0xc774c9(0x199)](_0x43df02(_0x84a45e['$1']));return this['processMoveRouteStepToCharacter'](_0x1b09ed);}else return _0x27851c[_0xc774c9(0x1d7)];}else{if(_0xc774c9(0x241)!==_0xc774c9(0x35a))return VisuMZ[_0xc774c9(0x5b2)][_0xc774c9(0x2fb)][_0xc774c9(0x24b)](this)-this[_0xc774c9(0x301)];else _0x1a8726[_0xc774c9(0x5b2)][_0xc774c9(0x173)][_0xc774c9(0x24b)](this),this['_spriteset'][_0xc774c9(0x4ff)]();}},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x3c7)]=function(_0x525b1a){const _0x136e69=_0x4cad34,_0x23e63a=VisuMZ[_0x136e69(0x5b2)]['Settings'][_0x136e69(0x4ac)];if(!_0x23e63a[_0x136e69(0x360)])return _0x525b1a;return[0x1,0x3,0x7,0x9]['includes'](this[_0x136e69(0x1ad)])&&('JLYqZ'!==_0x136e69(0x5eb)?this[_0x136e69(0x308)]=0x0:_0x525b1a*=_0x23e63a[_0x136e69(0x4e5)]||0.01),_0x525b1a;},VisuMZ['EventsMoveCore'][_0x4cad34(0x50e)]=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x4be)],Game_CharacterBase['prototype']['isDashing']=function(){const _0x2bd657=_0x4cad34;if(this[_0x2bd657(0x3a1)])return!![];return VisuMZ[_0x2bd657(0x5b2)]['Game_CharacterBase_isDashing'][_0x2bd657(0x24b)](this);},Game_CharacterBase['prototype'][_0x4cad34(0x17b)]=function(){const _0x132955=_0x4cad34;return this['isDashing']()&&this[_0x132955(0x115)]===0x0;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x23c)]=Game_CharacterBase['prototype'][_0x4cad34(0x1f4)],Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x1f4)]=function(){const _0x58cfda=_0x4cad34;return this[_0x58cfda(0x3de)]()?this[_0x58cfda(0x5b7)]():VisuMZ[_0x58cfda(0x5b2)]['Game_CharacterBase_pattern'][_0x58cfda(0x24b)](this);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x2e5)]=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x30b)],Game_CharacterBase['prototype'][_0x4cad34(0x30b)]=function(){const _0x598feb=_0x4cad34;VisuMZ[_0x598feb(0x5b2)][_0x598feb(0x2e5)]['call'](this),this[_0x598feb(0x29a)]();},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0xf1)]=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x10a)],Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x10a)]=function(){const _0xa01806=_0x4cad34;if(this['isSpriteVS8dir']())return this['characterIndexVS8']();return VisuMZ[_0xa01806(0x5b2)][_0xa01806(0xf1)][_0xa01806(0x24b)](this);},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x3fa)]=function(){const _0x5327c9=_0x4cad34,_0x3da03a=this[_0x5327c9(0x2a1)]();if(this[_0x5327c9(0x3e1)]()){if(_0x5327c9(0x1c8)==='dXtYU'){if([0x2,0x4,0x6,0x8][_0x5327c9(0x165)](_0x3da03a))return 0x4;if([0x1,0x3,0x7,0x9][_0x5327c9(0x165)](_0x3da03a))return 0x5;}else _0x183483[_0x5327c9(0x5b2)][_0x5327c9(0x5e5)][_0x5327c9(0x24b)](this,_0x6f3c4a,_0x188223);}else{if(this[_0x5327c9(0x480)]())return 0x6;else{if(this[_0x5327c9(0x3de)]())return this[_0x5327c9(0x1c0)]();else{if(this[_0x5327c9(0x142)]){if([0x2,0x4,0x6,0x8][_0x5327c9(0x165)](_0x3da03a))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x3da03a))return 0x5;}else{if(this[_0x5327c9(0x2d3)]()&&this['useCarryPoseForIcons']()){if([0x2,0x4,0x6,0x8][_0x5327c9(0x165)](_0x3da03a))return 0x4;if([0x1,0x3,0x7,0x9][_0x5327c9(0x165)](_0x3da03a))return 0x5;}else{if(this[_0x5327c9(0x17b)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x3da03a))return 0x2;if([0x1,0x3,0x7,0x9][_0x5327c9(0x165)](_0x3da03a))return 0x3;}else{if([0x2,0x4,0x6,0x8][_0x5327c9(0x165)](_0x3da03a))return 0x0;if([0x1,0x3,0x7,0x9][_0x5327c9(0x165)](_0x3da03a))return 0x1;}}}}}}},Game_CharacterBase[_0x4cad34(0x3a4)]['useCarryPoseForIcons']=function(){const _0x456b9f=_0x4cad34;return VisuMZ[_0x456b9f(0x5b2)][_0x456b9f(0x2f1)][_0x456b9f(0x555)]['CarryPose'];},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x45a)]=function(){const _0x3ee5cb=_0x4cad34;return this[_0x3ee5cb(0x480)]()&&this['terrainTag']()===VisuMZ[_0x3ee5cb(0x5b2)][_0x3ee5cb(0x2f1)][_0x3ee5cb(0x2c1)][_0x3ee5cb(0x2ca)];},Game_CharacterBase[_0x4cad34(0x3a4)]['directionOnLadderSpriteVS8dir']=function(){const _0x5de2c6=_0x4cad34;if(this[_0x5de2c6(0x45a)]()){if('LtDTy'!==_0x5de2c6(0x4fc))this[_0x5de2c6(0x4f8)][_0x5de2c6(0x1bc)][_0x5de2c6(0x3d3)](this[_0x5de2c6(0x489)]+0x1,0x0,_0x319393);else return 0x4;}else return 0x2;},VisuMZ['EventsMoveCore'][_0x4cad34(0x2bf)]=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x3ee)],Game_CharacterBase[_0x4cad34(0x3a4)]['update']=function(){const _0xc279f0=_0x4cad34;VisuMZ[_0xc279f0(0x5b2)][_0xc279f0(0x2bf)][_0xc279f0(0x24b)](this),this[_0xc279f0(0x16c)]();},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x16c)]=function(){const _0x5935bc=_0x4cad34;this['_poseDuration']=this['_poseDuration']||0x0;if(this[_0x5935bc(0x1cd)]>0x0){if('BQzlv'===_0x5935bc(0x3b8)){_0x4f73cf[_0x5935bc(0x249)][_0x7a596b][_0x5935bc(0x12a)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x495f2a='return\x20%1'[_0x5935bc(0x417)](_0x5b68d4(_0x194031['$1']));_0x50243d[_0x5935bc(0x185)][_0x50c87e]=new _0x3fff5c(_0x5935bc(0x18e),_0x495f2a);}else{this['_poseDuration']--;if(this[_0x5935bc(0x1cd)]<=0x0&&this['_pose']!==_0x5935bc(0x227))this[_0x5935bc(0x29a)]();}}},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x2e6)]=Game_CharacterBase['prototype'][_0x4cad34(0x221)],Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x221)]=function(_0x422123,_0x5be203){const _0x277cca=_0x4cad34;VisuMZ[_0x277cca(0x5b2)][_0x277cca(0x2e6)][_0x277cca(0x24b)](this,_0x422123,_0x5be203);if(this[_0x277cca(0x558)]())this[_0x277cca(0x454)](_0x422123,_0x5be203);},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x454)]=function(_0x5181de,_0x550841){const _0x1738ce=_0x4cad34;if(_0x5181de===0x4&&_0x550841===0x2)this['setDirection'](0x1);if(_0x5181de===0x6&&_0x550841===0x2)this['setDirection'](0x3);if(_0x5181de===0x4&&_0x550841===0x8)this[_0x1738ce(0x376)](0x7);if(_0x5181de===0x6&&_0x550841===0x8)this[_0x1738ce(0x376)](0x9);},VisuMZ['EventsMoveCore'][_0x4cad34(0x30c)]=Game_CharacterBase[_0x4cad34(0x3a4)]['hasStepAnime'],Game_CharacterBase['prototype'][_0x4cad34(0x103)]=function(){const _0x3c7120=_0x4cad34;if(this['isPosing']()&&this[_0x3c7120(0x15c)]()===_0x3c7120(0x227))return!![];return VisuMZ[_0x3c7120(0x5b2)]['Game_CharacterBase_hasStepAnime'][_0x3c7120(0x24b)](this);},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x108)]=function(_0x3a2781,_0x5316c6){const _0x12688a=_0x4cad34;if(_0x3a2781[_0x12688a(0x12a)](/Z/i))_0x3a2781=_0x12688a(0x227);if(_0x3a2781[_0x12688a(0x12a)](/SLEEP/i))_0x3a2781='ZZZ';this[_0x12688a(0x558)]()&&(this[_0x12688a(0x537)]=_0x3a2781[_0x12688a(0x5ca)]()[_0x12688a(0x2c6)](),this[_0x12688a(0x1cd)]=_0x5316c6||Infinity);},Game_CharacterBase['prototype']['getPose']=function(){const _0x286888=_0x4cad34;if(this[_0x286888(0x558)]()){if(_0x286888(0x451)===_0x286888(0x451))return(this[_0x286888(0x537)]||'')[_0x286888(0x5ca)]()[_0x286888(0x2c6)]();else{const _0x1c24ba=_0x2b6f8e['event'](_0x4856aa(_0x5b411c['$1']));return this[_0x286888(0x461)](_0x1c24ba);}}else return''[_0x286888(0x5ca)]()[_0x286888(0x2c6)]();},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x213)]=function(_0x491e25,_0x5a27aa){const _0x44e463=_0x4cad34;if(this[_0x44e463(0x558)]()){const _0xf23577=['',_0x44e463(0x334),'QUESTION',_0x44e463(0x49c),_0x44e463(0x1fb),_0x44e463(0x54c),_0x44e463(0x43c),_0x44e463(0x258),'SILENCE',_0x44e463(0x5a0),'ZZZ','','','','',''][_0x491e25];this[_0x44e463(0x108)](_0xf23577,_0x5a27aa);}},Game_CharacterBase[_0x4cad34(0x3a4)]['clearPose']=function(){const _0x54330f=_0x4cad34;this[_0x54330f(0x537)]='',this[_0x54330f(0x1cd)]=0x0;},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x3de)]=function(){const _0x5c9d3f=_0x4cad34;return this[_0x5c9d3f(0x558)]()&&!!this[_0x5c9d3f(0x537)];},Game_CharacterBase['prototype'][_0x4cad34(0x1c0)]=function(){const _0x1d3128=_0x4cad34,_0x877b3a=this[_0x1d3128(0x537)][_0x1d3128(0x5ca)]();switch(this[_0x1d3128(0x537)][_0x1d3128(0x5ca)]()[_0x1d3128(0x2c6)]()){case _0x1d3128(0x4e3):case'HMPH':case _0x1d3128(0x5f6):case _0x1d3128(0x282):case _0x1d3128(0x327):case _0x1d3128(0x197):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x1da)]=function(){const _0x3c3e3d=_0x4cad34;switch(this[_0x3c3e3d(0x537)][_0x3c3e3d(0x5ca)]()){case _0x3c3e3d(0x334):case _0x3c3e3d(0x44f):case _0x3c3e3d(0x49c):case'!':case'?':return 0x2;break;case _0x3c3e3d(0x1fb):case _0x3c3e3d(0x54c):case _0x3c3e3d(0x43c):return 0x4;break;case'ITEM':case _0x3c3e3d(0x17f):case _0x3c3e3d(0x5f6):case _0x3c3e3d(0x258):case'SILENCE':case _0x3c3e3d(0x5a0):return 0x6;break;case _0x3c3e3d(0x282):case _0x3c3e3d(0x327):case _0x3c3e3d(0x197):case _0x3c3e3d(0x227):case _0x3c3e3d(0x5cb):return 0x8;break;default:return VisuMZ['EventsMoveCore'][_0x3c3e3d(0x113)][_0x3c3e3d(0x24b)](this);break;}},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x5b7)]=function(){const _0x210c5a=_0x4cad34;switch(this[_0x210c5a(0x537)]['toUpperCase']()){case _0x210c5a(0x4e3):case _0x210c5a(0x282):case _0x210c5a(0x334):case'!':case _0x210c5a(0x1fb):case _0x210c5a(0x258):return 0x0;break;case _0x210c5a(0x17f):case _0x210c5a(0x327):case _0x210c5a(0x44f):case'?':case _0x210c5a(0x54c):case _0x210c5a(0x114):return 0x1;break;case _0x210c5a(0x5f6):case'COLLAPSE':case _0x210c5a(0x49c):case _0x210c5a(0x43c):case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ['EventsMoveCore'][_0x210c5a(0x23c)]['call'](this);break;}},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x191)]=function(){const _0x433240=_0x4cad34;this[_0x433240(0x142)]=!![];},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x4d2)]=function(){const _0x301ced=_0x4cad34;this[_0x301ced(0x142)]=![];},Game_CharacterBase['prototype'][_0x4cad34(0x20a)]=function(){const _0x19d755=_0x4cad34;this[_0x19d755(0x3a1)]=!![];},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x519)]=function(){const _0x31ef45=_0x4cad34;this[_0x31ef45(0x3a1)]=![];},Game_CharacterBase['prototype'][_0x4cad34(0x1c7)]=function(){const _0x46ffcf=_0x4cad34;if(this['isTile']())return![];if(this['_isObjectCharacter'])return![];if(this[_0x46ffcf(0x5de)]==='')return![];if(this[_0x46ffcf(0x35d)]===Game_Vehicle)return![];if(this['isTransparent']())return![];return!![];},Game_CharacterBase['prototype'][_0x4cad34(0x5f1)]=function(){const _0x34ca14=_0x4cad34;if(this['isOnLadder']())return!![];if(this[_0x34ca14(0x35d)]===Game_Player&&this[_0x34ca14(0x3be)]())return!![];return![];},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x1d3)]=function(){const _0xfdf8e0=_0x4cad34;return VisuMZ[_0xfdf8e0(0x5b2)][_0xfdf8e0(0x2f1)][_0xfdf8e0(0x4ac)][_0xfdf8e0(0x2dd)];},Game_CharacterBase[_0x4cad34(0x3a4)]['shadowX']=function(){const _0x25222d=_0x4cad34;return this[_0x25222d(0x445)]();},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x245)]=function(){const _0x3183a5=_0x4cad34,_0x91a998=$gameMap[_0x3183a5(0x5d5)]();return Math['floor'](this[_0x3183a5(0x171)]()*_0x91a998+_0x91a998);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x36d)]=function(_0x32d587,_0x1e7b62){const _0x568c78=_0x4cad34,_0x1b2327=this[_0x568c78(0x2ef)](),_0x56307a=$gameMap[_0x568c78(0x578)](),_0x55e5d8=[],_0x44152d=[],_0x488b50=[],_0x4a201e={};let _0x5515cb=_0x4a201e;if(this['x']===_0x32d587&&this['y']===_0x1e7b62)return 0x0;_0x4a201e['parent']=null,_0x4a201e['x']=this['x'],_0x4a201e['y']=this['y'],_0x4a201e['g']=0x0,_0x4a201e['f']=$gameMap[_0x568c78(0x4ee)](_0x4a201e['x'],_0x4a201e['y'],_0x32d587,_0x1e7b62),_0x55e5d8[_0x568c78(0x3c4)](_0x4a201e),_0x44152d[_0x568c78(0x3c4)](_0x4a201e['y']*_0x56307a+_0x4a201e['x']);while(_0x55e5d8[_0x568c78(0x207)]>0x0){if(_0x568c78(0xfc)===_0x568c78(0xfc)){let _0x1e35eb=0x0;for(let _0x38196f=0x0;_0x38196f<_0x55e5d8[_0x568c78(0x207)];_0x38196f++){_0x55e5d8[_0x38196f]['f']<_0x55e5d8[_0x1e35eb]['f']&&(_0x568c78(0x16f)===_0x568c78(0x16f)?_0x1e35eb=_0x38196f:(_0x34d1df[_0x568c78(0x54d)](_0x498d7b,_0x27ca66),_0xac1536['despawnRegions'](_0x3f5831['Region'])));}const _0x548516=_0x55e5d8[_0x1e35eb],_0x44046e=_0x548516['x'],_0x87687d=_0x548516['y'],_0x5b7a06=_0x87687d*_0x56307a+_0x44046e,_0x23b203=_0x548516['g'];_0x55e5d8[_0x568c78(0x3d3)](_0x1e35eb,0x1),_0x44152d[_0x568c78(0x3d3)](_0x44152d['indexOf'](_0x5b7a06),0x1),_0x488b50[_0x568c78(0x3c4)](_0x5b7a06);if(_0x548516['x']===_0x32d587&&_0x548516['y']===_0x1e7b62){_0x5515cb=_0x548516;break;}if(_0x23b203>=_0x1b2327){if(_0x568c78(0x1f1)===_0x568c78(0x1f1))continue;else _0x412bc7[_0x568c78(0x2cc)]('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.'[_0x568c78(0x417)](_0x5614f6));}const _0x24c41c=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x5e152c=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x1616d4=0x1;_0x1616d4<0xa;_0x1616d4++){if(_0x1616d4===0x5)continue;const _0x363756=_0x1616d4,_0x31364f=_0x24c41c[_0x1616d4],_0x1f3d3c=_0x5e152c[_0x1616d4],_0x14d535=$gameMap[_0x568c78(0x3d4)](_0x44046e,_0x363756),_0x159c50=$gameMap[_0x568c78(0x39c)](_0x87687d,_0x363756),_0x32f846=_0x159c50*_0x56307a+_0x14d535;if(_0x488b50['includes'](_0x32f846))continue;if(this[_0x568c78(0x35d)]===Game_Player&&VisuMZ[_0x568c78(0x5b2)]['Settings'][_0x568c78(0x4ac)][_0x568c78(0x110)]){if(!this[_0x568c78(0x3d5)](_0x44046e,_0x87687d,_0x31364f))continue;if(!this[_0x568c78(0x3d5)](_0x44046e,_0x87687d,_0x1f3d3c))continue;}if(!this[_0x568c78(0x4c3)](_0x44046e,_0x87687d,_0x31364f,_0x1f3d3c))continue;const _0x460acb=_0x23b203+0x1,_0x2b571c=_0x44152d[_0x568c78(0x1c6)](_0x32f846);if(_0x2b571c<0x0||_0x460acb<_0x55e5d8[_0x2b571c]['g']){let _0x59b4d4={};if(_0x2b571c>=0x0)'yfrFa'===_0x568c78(0x411)?_0x59b4d4=_0x55e5d8[_0x2b571c]:this[_0x568c78(0x26e)]['visible']=![];else{if(_0x568c78(0x55f)!==_0x568c78(0x55f)){if(this[_0x568c78(0x208)]===_0x3bc575)this[_0x568c78(0xf7)]();const _0x526664=_0x568c78(0x2a4)[_0x568c78(0x417)](_0x152631,_0x2a2600);this[_0x568c78(0x208)][_0x526664]={'iconIndex':_0x3e6e83,'bufferX':_0x27e8b1,'bufferY':_0x373d80,'blendMode':_0x388ec3};}else _0x55e5d8['push'](_0x59b4d4),_0x44152d[_0x568c78(0x3c4)](_0x32f846);}_0x59b4d4[_0x568c78(0x39e)]=_0x548516,_0x59b4d4['x']=_0x14d535,_0x59b4d4['y']=_0x159c50,_0x59b4d4['g']=_0x460acb,_0x59b4d4['f']=_0x460acb+$gameMap[_0x568c78(0x4ee)](_0x14d535,_0x159c50,_0x32d587,_0x1e7b62),(!_0x5515cb||_0x59b4d4['f']-_0x59b4d4['g']<_0x5515cb['f']-_0x5515cb['g'])&&(_0x5515cb=_0x59b4d4);}}}else this[_0x568c78(0x14f)]=![],this['_speed']=-0x1,this[_0x568c78(0x14d)]=0x0;}let _0x277e4f=_0x5515cb;while(_0x277e4f[_0x568c78(0x39e)]&&_0x277e4f[_0x568c78(0x39e)]!==_0x4a201e){_0x568c78(0x225)!==_0x568c78(0x4a5)?_0x277e4f=_0x277e4f['parent']:_0x5ac915=[_0x13630e,_0x2552ec,_0x284711[_0x568c78(0x5ca)]()[_0x568c78(0x2c6)]()];}const _0x4889b4=$gameMap['deltaX'](_0x277e4f['x'],_0x4a201e['x']),_0x454f33=$gameMap[_0x568c78(0x402)](_0x277e4f['y'],_0x4a201e['y']);if(_0x4889b4<0x0&&_0x454f33>0x0)return 0x1;if(_0x4889b4>0x0&&_0x454f33>0x0)return 0x3;if(_0x4889b4<0x0&&_0x454f33<0x0)return 0x7;if(_0x4889b4>0x0&&_0x454f33<0x0)return 0x9;if(_0x454f33>0x0)return 0x2;if(_0x4889b4<0x0)return 0x4;if(_0x4889b4>0x0)return 0x6;if(_0x454f33<0x0)return 0x8;const _0x13b3c3=this[_0x568c78(0x55b)](_0x32d587),_0x126c91=this['deltaYFrom'](_0x1e7b62);if(Math['abs'](_0x13b3c3)>Math[_0x568c78(0x2f6)](_0x126c91))return _0x13b3c3>0x0?0x4:0x6;else{if(_0x126c91!==0x0)return _0x126c91>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x41a)]=Game_CharacterBase['prototype'][_0x4cad34(0x3d5)],Game_CharacterBase['prototype'][_0x4cad34(0x3d5)]=function(_0x55f42c,_0x4c76ad,_0x31ebba){const _0x234855=_0x4cad34;if(this[_0x234855(0x144)]==='airship')return this['vehicle']()['isAirshipPassable'](_0x55f42c,_0x4c76ad,_0x31ebba);else{if('rMMdQ'===_0x234855(0x4cf)){_0x165ae0[_0x234855(0x54d)](_0x1ea9cd,_0x52eebb),_0x253255[_0x234855(0x497)](0x0),_0x34f7d3[_0x234855(0x1e0)](![]);for(const _0xa7e1db of _0x5c8394['followers']()[_0x234855(0x57d)]){if(_0xa7e1db)_0xa7e1db[_0x234855(0x45b)](![]);}}else return VisuMZ[_0x234855(0x5b2)][_0x234855(0x41a)][_0x234855(0x24b)](this,_0x55f42c,_0x4c76ad,_0x31ebba);}},Game_CharacterBase['prototype'][_0x4cad34(0x55a)]=function(){const _0x1654c8=_0x4cad34;this[_0x1654c8(0x236)]=0x0,this[_0x1654c8(0x2a3)]=0x0;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x4ae)]=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x445)],Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x445)]=function(){const _0x4ee1fd=_0x4cad34;return VisuMZ['EventsMoveCore']['Game_CharacterBase_screenX'][_0x4ee1fd(0x24b)](this)+(this[_0x4ee1fd(0x236)]||0x0);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x24e)]=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x5c4)],Game_CharacterBase['prototype'][_0x4cad34(0x5c4)]=function(){const _0x43ff08=_0x4cad34;return VisuMZ['EventsMoveCore']['Game_CharacterBase_screenY'][_0x43ff08(0x24b)](this)+(this[_0x43ff08(0x2a3)]||0x0);},Game_CharacterBase[_0x4cad34(0x418)]=VisuMZ[_0x4cad34(0x5b2)]['Settings'][_0x4cad34(0x4ac)][_0x4cad34(0x427)]??-0x6,Game_CharacterBase[_0x4cad34(0x3a4)]['shiftY']=function(){const _0x4915ca=_0x4cad34;return this[_0x4915ca(0x346)]()?0x0:-Game_CharacterBase[_0x4915ca(0x418)];},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x364)]=function(){const _0x53a400=_0x4cad34;this[_0x53a400(0x20f)]='';},VisuMZ[_0x4cad34(0x5b2)]['Game_CharacterBase_updatePattern']=Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x24c)],Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x24c)]=function(){const _0x213f85=_0x4cad34;if(this[_0x213f85(0x324)])return;if(this['updatePatternEventsMoveCore']())return;VisuMZ[_0x213f85(0x5b2)][_0x213f85(0x1c3)][_0x213f85(0x24b)](this);},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x35c)]=function(){const _0x2803e6=_0x4cad34;if(!this[_0x2803e6(0x103)]()&&this[_0x2803e6(0x115)]>0x0)return![];switch(String(this[_0x2803e6(0x20f)])[_0x2803e6(0x5ca)]()[_0x2803e6(0x2c6)]()){case'LEFT\x20TO\x20RIGHT':this[_0x2803e6(0x3eb)]+=0x1;if(this['_pattern']>0x2)this[_0x2803e6(0x3e0)](0x0);break;case _0x2803e6(0x5c7):this[_0x2803e6(0x3eb)]-=0x1;if(this[_0x2803e6(0x3eb)]<0x0)this[_0x2803e6(0x3e0)](0x2);break;case _0x2803e6(0x449):case _0x2803e6(0x25c):this[_0x2803e6(0x287)]();break;case _0x2803e6(0x117):case _0x2803e6(0x1b4):case _0x2803e6(0x3c6):case _0x2803e6(0x416):this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase[_0x4cad34(0x3a4)]['getEventIconData']=function(){const _0x21b991=_0x4cad34;return $gameSystem[_0x21b991(0x257)](this);},Game_CharacterBase[_0x4cad34(0x3a4)]['hasEventIcon']=function(){const _0x20fc5a=_0x4cad34,_0x1c508f=this[_0x20fc5a(0x257)]();if(!_0x1c508f)return![];return _0x1c508f[_0x20fc5a(0x12e)]>0x0;},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x559)]=function(){const _0x120e93=_0x4cad34,_0x24f61a=this[_0x120e93(0x2a1)]();return $gameMap[_0x120e93(0x3d4)](this['x'],_0x24f61a);},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x156)]=function(){const _0x46d61f=_0x4cad34,_0x42f5f6=this[_0x46d61f(0x2a1)]();return $gameMap[_0x46d61f(0x39c)](this['y'],_0x42f5f6);},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x3ba)]=function(){const _0x356fc1=_0x4cad34,_0x59dbf4=this[_0x356fc1(0x30e)](this[_0x356fc1(0x2a1)]());return $gameMap[_0x356fc1(0x3d4)](this['x'],_0x59dbf4);},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x52c)]=function(){const _0x94f738=_0x4cad34,_0x5a33e0=this[_0x94f738(0x30e)](this[_0x94f738(0x2a1)]());return $gameMap[_0x94f738(0x39c)](this['y'],_0x5a33e0);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x496)]=Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x1d6)],Game_Character[_0x4cad34(0x3a4)]['setMoveRoute']=function(_0x298fbd){const _0x114fc8=_0x4cad34;route=JsonEx[_0x114fc8(0x16d)](_0x298fbd),VisuMZ[_0x114fc8(0x5b2)][_0x114fc8(0x496)][_0x114fc8(0x24b)](this,route);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x22e)]=Game_Character[_0x4cad34(0x3a4)]['forceMoveRoute'],Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x39a)]=function(_0x240e3d){const _0x4f9339=_0x4cad34;route=JsonEx['makeDeepCopy'](_0x240e3d),VisuMZ['EventsMoveCore']['Game_Character_forceMoveRoute'][_0x4f9339(0x24b)](this,route);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x350)]=Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x274)],Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x274)]=function(_0x5237f2){const _0x544b78=_0x4cad34,_0x5168f9=Game_Character,_0x1a5062=_0x5237f2['parameters'];if(_0x5237f2['code']===_0x5168f9[_0x544b78(0x2f4)]){if(_0x544b78(0x3e4)===_0x544b78(0x523))this[_0x544b78(0x236)]=0x0,this[_0x544b78(0x2a3)]=0x0;else{let _0x2f6759=_0x5237f2[_0x544b78(0x243)][0x0];_0x2f6759=this[_0x544b78(0x52b)](_0x2f6759),_0x2f6759=this[_0x544b78(0x571)](_0x2f6759),this[_0x544b78(0x550)](_0x5237f2,_0x2f6759);}}else{if(_0x544b78(0x130)!==_0x544b78(0x40f))VisuMZ[_0x544b78(0x5b2)]['Game_Character_processMoveCommand'][_0x544b78(0x24b)](this,_0x5237f2);else return!![];}},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x52b)]=function(_0x1f6168){const _0x2bc3cd=_0x4cad34,_0x33053c=/\$gameVariables\.value\((\d+)\)/gi,_0x1b87b2=/\\V\[(\d+)\]/gi;while(_0x1f6168[_0x2bc3cd(0x12a)](_0x33053c)){_0x1f6168=_0x1f6168[_0x2bc3cd(0x192)](_0x33053c,(_0x2f921d,_0x27bb5c)=>$gameVariables[_0x2bc3cd(0x49f)](parseInt(_0x27bb5c)));}while(_0x1f6168['match'](_0x1b87b2)){_0x2bc3cd(0x455)===_0x2bc3cd(0x455)?_0x1f6168=_0x1f6168['replace'](_0x1b87b2,(_0x36accc,_0x3cb899)=>$gameVariables['value'](parseInt(_0x3cb899))):(this[_0x2bc3cd(0x1ad)]=_0x1b14fa,_0x540b6a['EventsMoveCore']['Game_CharacterBase_moveStraight'][_0x2bc3cd(0x24b)](this,_0x40570c));}return _0x1f6168;},Game_Character[_0x4cad34(0x3a4)]['convertSelfVariableValuesInScriptCall']=function(_0x3f4384){const _0x23bf06=_0x4cad34,_0x4ab27b=/\\SELFVAR\[(\d+)\]/gi;while(_0x3f4384[_0x23bf06(0x12a)](_0x4ab27b)){_0x3f4384=_0x3f4384['replace'](_0x4ab27b,(_0x2763df,_0x4edc48)=>getSelfVariableValue(this[_0x23bf06(0x2c8)],this[_0x23bf06(0x1a9)],parseInt(_0x4edc48)));}return _0x3f4384;},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x550)]=function(_0x8c4ede,_0x4272c8){const _0x80b235=_0x4cad34;if(_0x4272c8[_0x80b235(0x12a)](/ANIMATION:[ ](\d+)/i))return this[_0x80b235(0x479)](Number(RegExp['$1']));if(_0x4272c8[_0x80b235(0x12a)](/BALLOON:[ ](.*)/i))return _0x80b235(0x498)!==_0x80b235(0x498)?this[_0x80b235(0x3de)]()?this[_0x80b235(0x5b7)]():_0x5a5694[_0x80b235(0x5b2)][_0x80b235(0x23c)]['call'](this):this[_0x80b235(0x33d)](String(RegExp['$1']));if(_0x4272c8['match'](/FADE IN:[ ](\d+)/i))return this['processMoveRouteFadeIn'](Number(RegExp['$1']));if(_0x4272c8[_0x80b235(0x12a)](/FADE OUT:[ ](\d+)/i))return this[_0x80b235(0x592)](Number(RegExp['$1']));if(_0x4272c8['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x80b235(0x191)]();if(_0x4272c8['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i)){if(_0x80b235(0x453)!==_0x80b235(0x2a7))return this[_0x80b235(0x4d2)]();else this[_0x80b235(0x5d9)]['z']=this['z']-0x1;}if(_0x4272c8[_0x80b235(0x12a)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this['forceDashing']();if(_0x4272c8[_0x80b235(0x12a)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i)){if(_0x80b235(0x3cb)===_0x80b235(0x3cb))return this[_0x80b235(0x519)]();else{const _0x4e8796=this['_randomHomeX'],_0x6c023a=this['_randomHomeY'];return this[_0x80b235(0x42d)](_0x4e8796,_0x6c023a);}}if(_0x4272c8[_0x80b235(0x12a)](/HUG:[ ]LEFT/i))return'lviUq'==='HaLKX'?_0xf41e9a[_0x80b235(0x5b2)][_0x80b235(0x384)][_0x80b235(0x24b)](this,_0x28e2f3):this['processMoveRouteHugWall'](_0x80b235(0x424));if(_0x4272c8[_0x80b235(0x12a)](/HUG:[ ]RIGHT/i))return this[_0x80b235(0x5a6)](_0x80b235(0x413));if(_0x4272c8[_0x80b235(0x12a)](/INDEX:[ ](\d+)/i))return this[_0x80b235(0x3ed)](Number(RegExp['$1']));if(_0x4272c8[_0x80b235(0x12a)](/INDEX:[ ]([\+\-]\d+)/i)){const _0xdb0874=this[_0x80b235(0x13a)]+Number(RegExp['$1']);return this['processMoveRouteSetIndex'](_0xdb0874);}if(_0x4272c8[_0x80b235(0x12a)](/JUMP FORWARD:[ ](\d+)/i)){if('QsXDd'===_0x80b235(0x1dc))return this['processMoveRouteJumpForward'](Number(RegExp['$1']));else this[_0x80b235(0x407)](_0x272e91,_0xd69cb2['x']+0x2,_0x5e7121['y']);}if(_0x4272c8[_0x80b235(0x12a)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('bNBeO'!=='qVqxb')return this[_0x80b235(0x214)](Number(RegExp['$1']),Number(RegExp['$2']));else{if(this[_0x80b235(0x501)][_0x80b235(0x4ad)]()!=='')return![];}}if(_0x4272c8['match'](/JUMP TO EVENT:[ ](\d+)/i)){const _0x4fade2=$gameMap[_0x80b235(0x199)](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x4fade2);}if(_0x4272c8[_0x80b235(0x12a)](/JUMP TO PLAYER/i)){if(_0x80b235(0x5fb)===_0x80b235(0x5fb))return this['processMoveRouteJumpToCharacter']($gamePlayer);else this[_0x80b235(0x537)]=_0x1b4d58[_0x80b235(0x5ca)]()[_0x80b235(0x2c6)](),this[_0x80b235(0x1cd)]=_0x2cb233||_0x4440ff;}if(_0x4272c8['match'](/JUMP TO HOME/i)&&this[_0x80b235(0x477)]){if(_0x80b235(0x23a)!=='AgVrr'){const _0x42cf68=this['_randomHomeX'],_0x154c76=this[_0x80b235(0x575)];return this['processMoveRouteJumpTo'](_0x42cf68,_0x154c76);}else return this[_0x80b235(0x5d4)][_0x80b235(0x224)]||[];}if(_0x4272c8[_0x80b235(0x12a)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x3d7cdb=String(RegExp['$1']),_0x477d6f=this[_0x80b235(0x381)](_0x4272c8);return this[_0x80b235(0x439)](_0x3d7cdb,_0x477d6f);}if(_0x4272c8[_0x80b235(0x12a)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('IxHBB'===_0x80b235(0x28b)){const _0x15b9e2=Number(RegExp['$1']),_0x27e614=Number(RegExp['$2']),_0x1577ef=this['checkCollisionKeywords'](_0x4272c8);return this['processMoveRouteMoveTo'](_0x15b9e2,_0x27e614,_0x1577ef);}else{if(_0xa609b8)_0x4fa72c[_0x80b235(0x45b)](![]);}}if(_0x4272c8['match'](/MOVE TO EVENT:[ ](\d+)/i)){const _0x2112e1=$gameMap[_0x80b235(0x199)](Number(RegExp['$1'])),_0x1c86eb=this[_0x80b235(0x381)](_0x4272c8);return this[_0x80b235(0x533)](_0x2112e1,_0x1c86eb);}if(_0x4272c8['match'](/MOVE TO PLAYER/i)){if(_0x80b235(0x4c6)==='fSTlz'){_0xa4656f[_0x80b235(0x5b2)]['Game_Timer_stop'][_0x80b235(0x24b)](this);if(this[_0x80b235(0x14f)]===_0x5785fd)this[_0x80b235(0xf7)]();this[_0x80b235(0x14f)]=![];}else{const _0x1beedd=this['checkCollisionKeywords'](_0x4272c8);return this['processMoveRouteMoveToCharacter']($gamePlayer,_0x1beedd);}}if(_0x4272c8[_0x80b235(0x12a)](/MOVE TO HOME/i)&&this['eventId']){const _0x22c7d1=this[_0x80b235(0x3a5)],_0x3bf475=this[_0x80b235(0x575)],_0x15b186=this[_0x80b235(0x381)](_0x4272c8);return this[_0x80b235(0x240)](_0x22c7d1,_0x3bf475,_0x15b186);}if(_0x4272c8[_0x80b235(0x12a)](/MOVE LOWER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x1,Number(RegExp['$1']));if(_0x4272c8[_0x80b235(0x12a)](/MOVE DOWN:[ ](\d+)/i))return _0x80b235(0x4d1)===_0x80b235(0x4d1)?this['processMoveRouteMoveRepeat'](0x2,Number(RegExp['$1'])):this[_0x80b235(0x576)](_0x4ea351);if(_0x4272c8[_0x80b235(0x12a)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x80b235(0x2ed)](0x3,Number(RegExp['$1']));if(_0x4272c8[_0x80b235(0x12a)](/MOVE LEFT:[ ](\d+)/i))return this[_0x80b235(0x2ed)](0x4,Number(RegExp['$1']));if(_0x4272c8[_0x80b235(0x12a)](/MOVE RIGHT:[ ](\d+)/i)){if('NCroB'!=='NCroB'){const _0x4d2668=_0x2dc731[_0x80b235(0x5d5)]();return _0x370bcc['floor'](this[_0x80b235(0x171)]()*_0x4d2668+_0x4d2668);}else return this[_0x80b235(0x2ed)](0x6,Number(RegExp['$1']));}if(_0x4272c8[_0x80b235(0x12a)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x80b235(0x2ed)](0x7,Number(RegExp['$1']));if(_0x4272c8[_0x80b235(0x12a)](/MOVE UP:[ ](\d+)/i)){if('PwaFz'===_0x80b235(0x246)){const _0x59a0df=[_0x221eb7[_0x80b235(0x2c8)],_0x426a1c['_eventId'],_0x80b235(0x5f0)['format'](_0x97e93)];return _0x632e1[_0x80b235(0x49f)](_0x59a0df);}else return this[_0x80b235(0x2ed)](0x8,Number(RegExp['$1']));}if(_0x4272c8['match'](/MOVE UPPER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x9,Number(RegExp['$1']));if(_0x4272c8[_0x80b235(0x12a)](/OPACITY:[ ](\d+)([%％])/i)){const _0x214e60=Math[_0x80b235(0x1b7)](Number(RegExp['$1'])/0x64*0xff);return this[_0x80b235(0x44c)](_0x214e60[_0x80b235(0x229)](0x0,0xff));}if(_0x4272c8['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x3e97ad=this['_opacity']+Math[_0x80b235(0x1b7)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x3e97ad[_0x80b235(0x229)](0x0,0xff));}if(_0x4272c8[_0x80b235(0x12a)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x4945d8=this['_opacity']+Number(RegExp['$1']);return this['setOpacity'](_0x4945d8[_0x80b235(0x229)](0x0,0xff));}if(_0x4272c8['match'](/PATTERN LOCK:[ ](\d+)/i)){if(_0x80b235(0x132)!==_0x80b235(0x132)){if(this[_0x80b235(0x558)]())return this[_0x80b235(0x3fa)]();return _0x53176d['EventsMoveCore']['Game_CharacterBase_characterIndex'][_0x80b235(0x24b)](this);}else return this['processMoveRoutePatternLock'](Number(RegExp['$1']));}if(_0x4272c8['match'](/PATTERN UNLOCK/i)){if(_0x80b235(0x2f5)==='WzKXm')return this[_0x80b235(0x324)]=![];else this[_0x80b235(0x532)]['apply'](this,arguments);}if(_0x4272c8[_0x80b235(0x12a)](/POSE:[ ](.*)/i)){const _0x38a3d6=String(RegExp['$1'])[_0x80b235(0x5ca)]()[_0x80b235(0x2c6)]();return this[_0x80b235(0x108)](_0x38a3d6);}if(_0x4272c8[_0x80b235(0x12a)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x80b235(0x153)!==_0x80b235(0x3aa)){const _0x545755=Number(RegExp['$1']),_0x5224cf=Number(RegExp['$2']);return this[_0x80b235(0x522)](_0x545755,_0x5224cf);}else return this[_0x80b235(0x191)]();}if(_0x4272c8[_0x80b235(0x12a)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x12302e=$gameMap[_0x80b235(0x199)](Number(RegExp['$1']));return this['processMoveRouteStepToCharacter'](_0x12302e);}if(_0x4272c8[_0x80b235(0x12a)](/STEP TOWARD PLAYER/i))return this[_0x80b235(0x4f0)]($gamePlayer);if(_0x4272c8[_0x80b235(0x12a)](/STEP TOWARD HOME/i)&&this[_0x80b235(0x477)]){if(_0x80b235(0x2fd)==='USpla'){const _0x9df292=this[_0x80b235(0x3a5)],_0x217776=this[_0x80b235(0x575)];return this['processMoveRouteStepTo'](_0x9df292,_0x217776);}else _0x56b361[_0x80b235(0x1c1)](this[_0x80b235(0x14d)]);}if(_0x4272c8[_0x80b235(0x12a)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x80b235(0x332)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x4272c8[_0x80b235(0x12a)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){if(_0x80b235(0x33b)===_0x80b235(0x33b)){const _0x32e56c=$gameMap[_0x80b235(0x199)](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x32e56c);}else _0x9f48ae[_0x80b235(0x54d)](_0x5f3f1b,_0x36c99c),_0x4bf5bd[_0x80b235(0x217)](_0x25fbd0);}if(_0x4272c8[_0x80b235(0x12a)](/STEP AWAY FROM PLAYER/i)){if('qXRmC'===_0x80b235(0x10e)){if(this['_EventIcons']===_0x34589e)this['initEventsMoveCore']();const _0x35d5c2=_0x15df7d===_0xcbc535?_0x80b235(0x1f0):_0x80b235(0x2a4)[_0x80b235(0x417)](_0x28a63d[_0x80b235(0x2c8)],_0x3d0f18[_0x80b235(0x1a9)]);this[_0x80b235(0x208)][_0x35d5c2]={'iconIndex':_0x3064ff,'bufferX':_0x3c699e,'bufferY':_0x18b044,'blendMode':_0x4d7888};}else return this[_0x80b235(0x461)]($gamePlayer);}if(_0x4272c8[_0x80b235(0x12a)](/STEP AWAY FROM HOME/i)&&this[_0x80b235(0x477)]){const _0x4fec46=this['_randomHomeX'],_0x225986=this[_0x80b235(0x575)];return this[_0x80b235(0x332)](_0x4fec46,_0x225986);}if(_0x4272c8[_0x80b235(0x12a)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x80b235(0x3ae)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x4272c8[_0x80b235(0x12a)](/TURN TO EVENT:[ ](\d+)/i)){if(_0x80b235(0x11a)===_0x80b235(0x11a)){const _0x2fd46d=$gameMap[_0x80b235(0x199)](Number(RegExp['$1']));return this[_0x80b235(0x278)](_0x2fd46d);}else{if([0x2,0x4,0x6,0x8][_0x80b235(0x165)](_0x2a0e3a))return 0x0;if([0x1,0x3,0x7,0x9]['includes'](_0x2110fb))return 0x1;}}if(_0x4272c8[_0x80b235(0x12a)](/TURN TO PLAYER/i))return this[_0x80b235(0x278)]($gamePlayer);if(_0x4272c8[_0x80b235(0x12a)](/TURN TO HOME/i)&&this['eventId']){if(_0x80b235(0x400)!=='wKHea'){const _0x20822d=this[_0x80b235(0x3a5)],_0x30d730=this[_0x80b235(0x575)];return this[_0x80b235(0x170)](_0x20822d,_0x30d730);}else this['_attachPictureSprite'][_0x80b235(0x572)][_0x80b235(0x2cf)]=!![];}if(_0x4272c8[_0x80b235(0x12a)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x80b235(0x4f1)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x4272c8[_0x80b235(0x12a)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x48ddee=$gameMap[_0x80b235(0x199)](Number(RegExp['$1']));return this[_0x80b235(0x52f)](_0x48ddee);}if(_0x4272c8[_0x80b235(0x12a)](/TURN AWAY FROM PLAYER/i))return this['turnAwayFromCharacter']($gamePlayer);if(_0x4272c8[_0x80b235(0x12a)](/TURN AWAY FROM HOME/i)&&this['eventId']){const _0x231052=this[_0x80b235(0x3a5)],_0x5cdb76=this[_0x80b235(0x575)];return this['turnAwayFromPoint'](_0x231052,_0x5cdb76);}if(_0x4272c8[_0x80b235(0x12a)](/TURN LOWER LEFT/i)){if(_0x80b235(0x1b3)==='ktfsd')_0x263550[_0x80b235(0x149)]()?this[_0x80b235(0x1be)](_0x458bf0):_0x56f332['EventsMoveCore']['Game_Player_executeMove'][_0x80b235(0x24b)](this,_0x131b8c);else return this['setDirection'](0x1);}if(_0x4272c8[_0x80b235(0x12a)](/TURN LOWER RIGHT/i))return this[_0x80b235(0x376)](0x3);if(_0x4272c8[_0x80b235(0x12a)](/TURN UPPER LEFT/i))return this['setDirection'](0x7);if(_0x4272c8[_0x80b235(0x12a)](/TURN UPPER RIGHT/i))return this['setDirection'](0x9);if(_0x4272c8['match'](/Self Switch[ ](.*):[ ](.*)/i))return _0x80b235(0x49b)!=='eZQmE'?this[_0x80b235(0x201)](RegExp['$1'],RegExp['$2']):this[_0x80b235(0x42a)];if(_0x4272c8['match'](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x80b235(0x5bc)](RegExp['$1'],RegExp['$2']);if(_0x4272c8[_0x80b235(0x12a)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x80b235(0x4a6)!==_0x80b235(0x2fc))return this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));else this[_0x80b235(0x376)](_0x3af427);}if(_0x4272c8[_0x80b235(0x12a)](/TELEPORT TO EVENT:[ ](\d+)/i)){if('LltqL'!=='LltqL'){if(_0x1b16a1[_0x80b235(0x17a)])this[_0x80b235(0x3cf)](_0x4f5fb2[_0x80b235(0x17a)]);}else{const _0xf7710b=$gameMap[_0x80b235(0x199)](Number(RegExp['$1']));return this[_0x80b235(0x40b)](_0xf7710b);}}if(_0x4272c8[_0x80b235(0x12a)](/TELEPORT TO PLAYER/i))return this[_0x80b235(0x40b)]($gamePlayer);if(_0x4272c8['match'](/TELEPORT TO HOME/i)&&this[_0x80b235(0x477)]){const _0x46f8a8=this[_0x80b235(0x3a5)],_0x3300f6=this[_0x80b235(0x575)];return this[_0x80b235(0x42d)](_0x46f8a8,_0x3300f6);}try{VisuMZ['EventsMoveCore'][_0x80b235(0x350)][_0x80b235(0x24b)](this,_0x8c4ede);}catch(_0x11586b){if($gameTemp[_0x80b235(0x1e3)]())console[_0x80b235(0x2cc)](_0x11586b);}},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x479)]=function(_0x4ed694){const _0x39864b=_0x4cad34;$gameTemp[_0x39864b(0x5a2)]([this],_0x4ed694);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x33d)]=function(_0x5c7e21){const _0x57d3b1=_0x4cad34;let _0x4317ed=0x0;switch(_0x5c7e21[_0x57d3b1(0x5ca)]()[_0x57d3b1(0x2c6)]()){case'!':case _0x57d3b1(0x334):_0x4317ed=0x1;break;case'?':case _0x57d3b1(0x44f):_0x4317ed=0x2;break;case _0x57d3b1(0x232):case'NOTE':case _0x57d3b1(0x49c):case'MUSIC-NOTE':case _0x57d3b1(0x270):_0x4317ed=0x3;break;case _0x57d3b1(0x1fb):case _0x57d3b1(0x462):_0x4317ed=0x4;break;case'ANGER':_0x4317ed=0x5;break;case _0x57d3b1(0x43c):_0x4317ed=0x6;break;case _0x57d3b1(0x258):case _0x57d3b1(0x392):case _0x57d3b1(0x390):_0x4317ed=0x7;break;case _0x57d3b1(0x114):case _0x57d3b1(0x5b4):_0x4317ed=0x8;break;case _0x57d3b1(0x247):case _0x57d3b1(0x5aa):case _0x57d3b1(0x5a0):case _0x57d3b1(0x127):case'LIGHTBULB':_0x4317ed=0x9;break;case'Z':case'ZZ':case _0x57d3b1(0x227):case _0x57d3b1(0x5cb):_0x4317ed=0xa;break;case _0x57d3b1(0x406):_0x4317ed=0xb;break;case _0x57d3b1(0x218):_0x4317ed=0xc;break;case _0x57d3b1(0x126):_0x4317ed=0xd;break;case'USER-DEFINED\x204':_0x4317ed=0xe;break;case _0x57d3b1(0x46c):_0x4317ed=0xf;break;}$gameTemp[_0x57d3b1(0x2af)](this,_0x4317ed);},Game_Character[_0x4cad34(0x3a4)]['processMoveRouteFadeIn']=function(_0x4490e8){const _0x13b17c=_0x4cad34;_0x4490e8+=this['_opacity'],this[_0x13b17c(0x44c)](_0x4490e8['clamp'](0x0,0xff));if(this[_0x13b17c(0x5dc)]<0xff)this[_0x13b17c(0x489)]--;},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x592)]=function(_0x3cb20f){const _0x11cfe0=_0x4cad34;_0x3cb20f=this['_opacity']-_0x3cb20f,this[_0x11cfe0(0x44c)](_0x3cb20f['clamp'](0x0,0xff));if(this[_0x11cfe0(0x5dc)]>0x0)this[_0x11cfe0(0x489)]--;},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x5a6)]=function(_0x33f8b9){const _0x30c2a9=_0x4cad34,_0x2cc513=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x350e7e=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x1cbc8a=this[_0x30c2a9(0x2a1)](),_0x49aff7=(_0x33f8b9===_0x30c2a9(0x424)?_0x2cc513:_0x350e7e)[_0x1cbc8a],_0x50587f=(_0x33f8b9===_0x30c2a9(0x424)?_0x350e7e:_0x2cc513)[_0x1cbc8a];if(this[_0x30c2a9(0x3d5)](this['x'],this['y'],_0x49aff7))_0x33f8b9==='left'?this[_0x30c2a9(0x22d)]():this[_0x30c2a9(0x287)]();else!this['canPass'](this['x'],this['y'],this[_0x30c2a9(0x2a1)]())&&(this[_0x30c2a9(0x3d5)](this['x'],this['y'],_0x50587f)?_0x33f8b9===_0x30c2a9(0x424)?this[_0x30c2a9(0x287)]():this['turnLeft90']():this[_0x30c2a9(0x189)]());this[_0x30c2a9(0x3d5)](this['x'],this['y'],this[_0x30c2a9(0x2a1)]())&&this['moveForward']();},Game_Character[_0x4cad34(0x3a4)]['processMoveRouteSetIndex']=function(_0x315721){const _0x4610ef=_0x4cad34;if(ImageManager[_0x4610ef(0x564)](this['_characterName']))return;_0x315721=_0x315721['clamp'](0x0,0x7),this['setImage'](this[_0x4610ef(0x5de)],_0x315721);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x47f)]=function(_0x3872d9){const _0x20727a=_0x4cad34;switch(this[_0x20727a(0x2a1)]()){case 0x1:this[_0x20727a(0x425)](-_0x3872d9,_0x3872d9);break;case 0x2:this['jump'](0x0,_0x3872d9);break;case 0x3:this[_0x20727a(0x425)](_0x3872d9,_0x3872d9);break;case 0x4:this[_0x20727a(0x425)](-_0x3872d9,0x0);break;case 0x6:this['jump'](_0x3872d9,0x0);break;case 0x7:this[_0x20727a(0x425)](-_0x3872d9,-_0x3872d9);break;case 0x8:this[_0x20727a(0x425)](0x0,-_0x3872d9);break;case 0x9:this[_0x20727a(0x425)](_0x3872d9,-_0x3872d9);break;}},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x214)]=function(_0x7fc895,_0x21ced1){const _0x5d6022=_0x4cad34,_0x1d5ccf=Math[_0x5d6022(0x1b7)](_0x7fc895-this['x']),_0x2fe0d7=Math[_0x5d6022(0x1b7)](_0x21ced1-this['y']);this['jump'](_0x1d5ccf,_0x2fe0d7);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x129)]=function(_0x5e0cba){const _0x4bbfbc=_0x4cad34;if(_0x5e0cba)this[_0x4bbfbc(0x214)](_0x5e0cba['x'],_0x5e0cba['y']);},Game_Character[_0x4cad34(0x3a4)]['processMoveRouteStepTo']=function(_0x2eb050,_0x1f6df2,_0x2f03ce){const _0xc9a235=_0x4cad34;let _0x4788f6=0x0;if(_0x2f03ce)$gameTemp[_0xc9a235(0x234)]=!![];$gameMap[_0xc9a235(0x149)]()?_0x4788f6=this['findDiagonalDirectionTo'](_0x2eb050,_0x1f6df2):_0x4788f6=this[_0xc9a235(0xf3)](_0x2eb050,_0x1f6df2);if(_0x2f03ce)$gameTemp['_moveAllowPlayerCollision']=![];this[_0xc9a235(0x1be)](_0x4788f6),this[_0xc9a235(0x28c)](!![]);},Game_Character['prototype'][_0x4cad34(0x4f0)]=function(_0xc2d13d){if(_0xc2d13d)this['processMoveRouteStepTo'](_0xc2d13d['x'],_0xc2d13d['y']);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x4e6)]=function(_0x4cc0e6,_0x317a07){const _0xb3d66c=_0x4cad34,_0x550e93=this[_0xb3d66c(0x55b)](_0x4cc0e6),_0x1ea12c=this['deltaYFrom'](_0x317a07);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x381)]=function(_0x3e35ce){const _0x3d87af=_0x4cad34;if(_0x3e35ce[_0x3d87af(0x12a)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else{if(_0x3e35ce[_0x3d87af(0x12a)](/(?:AVOID|EVADE|DODGE)/i)){if(_0x3d87af(0x100)!==_0x3d87af(0x1e7))return![];else _0x1891fb['y']+=0x1;}else return![];}},VisuMZ['EventsMoveCore'][_0x4cad34(0x53c)]=Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x594)],Game_Event[_0x4cad34(0x3a4)]['isCollidedWithPlayerCharacters']=function(_0x5e386a,_0xbbfba8){const _0x151f05=_0x4cad34;if($gameTemp[_0x151f05(0x234)])return![];return VisuMZ[_0x151f05(0x5b2)][_0x151f05(0x53c)][_0x151f05(0x24b)](this,_0x5e386a,_0xbbfba8);},Game_Character[_0x4cad34(0x3a4)]['processMoveRouteMoveUntilStop']=function(_0x18627d,_0x4a7e1b){const _0x5c10d2=_0x4cad34,_0x2003a5=['',_0x5c10d2(0x211),'DOWN',_0x5c10d2(0x212),'LEFT','',_0x5c10d2(0x120),_0x5c10d2(0x4e2),'UP',_0x5c10d2(0x2e0)],_0xabe026=_0x2003a5[_0x5c10d2(0x1c6)](_0x18627d['toUpperCase']()['trim']());if(_0xabe026<=0x0)return;if(_0x4a7e1b)$gameTemp[_0x5c10d2(0x234)]=!![];if(this[_0x5c10d2(0x3d5)](this['x'],this['y'],_0xabe026)){if(_0x4a7e1b)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x5c10d2(0x1be)](_0xabe026),this[_0x5c10d2(0x489)]-=0x1;}if(_0x4a7e1b)$gameTemp[_0x5c10d2(0x234)]=![];},Game_Character['prototype'][_0x4cad34(0x240)]=function(_0x9c802f,_0xff26bd,_0x23844a){this['processMoveRouteStepTo'](_0x9c802f,_0xff26bd,_0x23844a);if(this['x']!==_0x9c802f||this['y']!==_0xff26bd)this['_moveRouteIndex']--;},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x533)]=function(_0x5c83ae,_0x1cef88){const _0x45ae91=_0x4cad34;if(_0x5c83ae)this[_0x45ae91(0x240)](_0x5c83ae['x'],_0x5c83ae['y'],_0x1cef88);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x2ed)]=function(_0x5f8adf,_0x259d6b){const _0x3e20f6=_0x4cad34;_0x259d6b=_0x259d6b||0x0;const _0x1f4795={'code':0x1,'indent':null,'parameters':[]};_0x1f4795['code']=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x5f8adf],this[_0x3e20f6(0x4f8)][_0x3e20f6(0x1bc)][this[_0x3e20f6(0x489)]][_0x3e20f6(0x243)][0x0]='';while(_0x259d6b--){_0x3e20f6(0x248)!=='NQMoa'?this['_moveRoute'][_0x3e20f6(0x1bc)]['splice'](this[_0x3e20f6(0x489)]+0x1,0x0,_0x1f4795):(this[_0x3e20f6(0x554)](_0x79687f>0x0?0x4:0x6),!this[_0x3e20f6(0x37a)]()&&_0x260de9!==0x0&&this['moveStraight'](_0x4a8ec2>0x0?0x8:0x2));}},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x17d)]=function(_0x3dc5d4){this['_patternLocked']=!![],this['setPattern'](_0x3dc5d4);},Game_Character[_0x4cad34(0x3a4)]['processMoveRouteSelfSwitch']=function(_0x186f56,_0xfafd57){const _0x28b103=_0x4cad34;if(this===$gamePlayer)return;const _0x168a7d=[this[_0x28b103(0x2c8)],this['_eventId'],'A'];if(_0x186f56[_0x28b103(0x12a)](/\b[ABCD]\b/i))_0x168a7d[0x2]=String(_0x186f56)[_0x28b103(0x19b)](0x0)[_0x28b103(0x5ca)]()['trim']();else{if('DKYhY'===_0x28b103(0x343))_0x168a7d[0x2]=_0x28b103(0x5f0)[_0x28b103(0x417)](_0x186f56);else while(this['isRunning']()){this[_0x28b103(0x21f)]();}}switch(_0xfafd57[_0x28b103(0x5ca)]()[_0x28b103(0x2c6)]()){case'ON':case'TRUE':$gameSelfSwitches['setValue'](_0x168a7d,!![]);break;case _0x28b103(0x298):case _0x28b103(0x338):$gameSelfSwitches[_0x28b103(0x51a)](_0x168a7d,![]);break;case'TOGGLE':$gameSelfSwitches['setValue'](_0x168a7d,!$gameSelfSwitches[_0x28b103(0x49f)](_0x168a7d));break;}},Game_Character[_0x4cad34(0x3a4)]['processMoveRouteSelfVariable']=function(_0x566a3d,_0x2f5142){const _0x10afcc=_0x4cad34;if(this===$gamePlayer)return;const _0x6c90c=[this[_0x10afcc(0x2c8)],this[_0x10afcc(0x1a9)],_0x10afcc(0x503)[_0x10afcc(0x417)](_0x566a3d)];$gameSelfSwitches[_0x10afcc(0x51a)](_0x6c90c,Number(_0x2f5142));},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x42d)]=function(_0xea1337,_0x47e698){const _0x29ba14=_0x4cad34;this[_0x29ba14(0x2cd)](_0xea1337,_0x47e698);},Game_Character[_0x4cad34(0x3a4)]['processMoveRouteTeleportToCharacter']=function(_0x4f36ab){const _0xb3bd00=_0x4cad34;if(_0x4f36ab)this[_0xb3bd00(0x42d)](_0x4f36ab['x'],_0x4f36ab['y']);},Game_Character[_0x4cad34(0x3a4)]['turnRight90']=function(){const _0x207cd6=_0x4cad34;switch(this[_0x207cd6(0x2a1)]()){case 0x1:this['setDirection'](0x7);break;case 0x2:this['setDirection'](0x4);break;case 0x3:this[_0x207cd6(0x376)](0x1);break;case 0x4:this[_0x207cd6(0x376)](0x8);break;case 0x6:this[_0x207cd6(0x376)](0x2);break;case 0x7:this[_0x207cd6(0x376)](0x9);break;case 0x8:this[_0x207cd6(0x376)](0x6);break;case 0x9:this[_0x207cd6(0x376)](0x3);break;}},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x22d)]=function(){const _0xa6991e=_0x4cad34;switch(this['direction']()){case 0x1:this[_0xa6991e(0x376)](0x3);break;case 0x2:this['setDirection'](0x6);break;case 0x3:this[_0xa6991e(0x376)](0x9);break;case 0x4:this['setDirection'](0x2);break;case 0x6:this[_0xa6991e(0x376)](0x8);break;case 0x7:this[_0xa6991e(0x376)](0x1);break;case 0x8:this[_0xa6991e(0x376)](0x4);break;case 0x9:this['setDirection'](0x7);break;}},Game_Character['prototype']['getDirectionToPoint']=function(_0x4f96f8,_0x4f2f28,_0x487012){const _0x377677=_0x4cad34,_0x340902=this[_0x377677(0x55b)](_0x4f96f8),_0x870e2=this[_0x377677(0x26b)](_0x4f2f28);if($gameMap[_0x377677(0x149)]()){if(_0x487012||this['isSpriteVS8dir']()){if(_0x377677(0x188)!=='dUOXE'){if(_0x340902>0x0&&_0x870e2<0x0)return 0x1;if(_0x340902<0x0&&_0x870e2<0x0)return 0x3;if(_0x340902>0x0&&_0x870e2>0x0)return 0x7;if(_0x340902<0x0&&_0x870e2>0x0)return 0x9;}else this[_0x377677(0x20f)]='';}}if(Math['abs'](_0x340902)>Math[_0x377677(0x2f6)](_0x870e2)){if(_0x377677(0xf9)==='bjaoV')_0x407f80=0x4;else return _0x340902>0x0?0x4:0x6;}else{if(_0x870e2!==0x0){if(_0x377677(0x46e)!==_0x377677(0x46e)){if([0x2,0x4,0x6,0x8]['includes'](_0x1abd35))return 0x4;if([0x1,0x3,0x7,0x9][_0x377677(0x165)](_0x147d19))return 0x5;}else return _0x870e2>0x0?0x8:0x2;}}return 0x0;},Game_Character[_0x4cad34(0x3a4)]['getDirectionFromPoint']=function(_0x1e7f39,_0x4453bd,_0xda277c){const _0x39cbd2=_0x4cad34,_0x3c5f1c=this['deltaXFrom'](_0x1e7f39),_0x597c28=this[_0x39cbd2(0x26b)](_0x4453bd);if($gameMap[_0x39cbd2(0x149)]()){if(_0xda277c||this['isSpriteVS8dir']()){if('fnONS'!=='fpjHA'){if(_0x3c5f1c>0x0&&_0x597c28<0x0)return 0x9;if(_0x3c5f1c<0x0&&_0x597c28<0x0)return 0x7;if(_0x3c5f1c>0x0&&_0x597c28>0x0)return 0x3;if(_0x3c5f1c<0x0&&_0x597c28>0x0)return 0x1;}else{if(this[_0x39cbd2(0x5d2)]!==0x3)return;if(this[_0x39cbd2(0x198)])return;if(!this[_0x39cbd2(0x289)](![]))return;if(!this[_0x39cbd2(0x12c)](![]))return;_0x322ce2[_0x39cbd2(0x5b2)][_0x39cbd2(0x510)]['call'](this);}}}if(Math[_0x39cbd2(0x2f6)](_0x3c5f1c)>Math[_0x39cbd2(0x2f6)](_0x597c28))return _0x3c5f1c>0x0?0x6:0x4;else{if(_0x597c28!==0x0)return _0x597c28>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x3ae)]=function(_0x2ebc8f,_0x4df624){const _0x5b0978=_0x4cad34,_0x2e7c5a=this[_0x5b0978(0x3b7)](_0x2ebc8f,_0x4df624,!![]);if(_0x2e7c5a)this[_0x5b0978(0x1be)](_0x2e7c5a);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x332)]=function(_0x3bed75,_0x5874f4){const _0x422b14=_0x4cad34,_0x458ff2=this[_0x422b14(0x50b)](_0x3bed75,_0x5874f4,!![]);if(_0x458ff2)this[_0x422b14(0x1be)](_0x458ff2);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x170)]=function(_0x54fa35,_0x1aba82){const _0x2d85fd=_0x4cad34,_0x121192=this[_0x2d85fd(0x3b7)](_0x54fa35,_0x1aba82,![]);if(_0x121192)this[_0x2d85fd(0x376)](_0x121192);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x4f1)]=function(_0x647d9e,_0x118c78){const _0x1d532f=_0x4cad34,_0x24adca=this['getDirectionFromPoint'](_0x647d9e,_0x118c78,![]);if(_0x24adca)this[_0x1d532f(0x376)](_0x24adca);},Game_Character['prototype']['moveTowardCharacter']=function(_0x198eb3){const _0x103c9e=_0x4cad34;if(_0x198eb3)this[_0x103c9e(0x3ae)](_0x198eb3['x'],_0x198eb3['y']);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x461)]=function(_0x4382e6){const _0x2a3b4d=_0x4cad34;if(_0x4382e6)this[_0x2a3b4d(0x332)](_0x4382e6['x'],_0x4382e6['y']);},Game_Character[_0x4cad34(0x3a4)][_0x4cad34(0x278)]=function(_0x49f573){const _0x7b850d=_0x4cad34;if(_0x49f573)this[_0x7b850d(0x170)](_0x49f573['x'],_0x49f573['y']);},Game_Character[_0x4cad34(0x3a4)]['turnAwayFromCharacter']=function(_0xd705c7){const _0x57c911=_0x4cad34;if(_0xd705c7)this[_0x57c911(0x4f1)](_0xd705c7['x'],_0xd705c7['y']);},VisuMZ[_0x4cad34(0x5b2)]['Game_Player_isDashing']=Game_Player['prototype']['isDashing'],Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x4be)]=function(){const _0x34434c=_0x4cad34;if(this[_0x34434c(0x3a1)])return!![];return VisuMZ['EventsMoveCore'][_0x34434c(0x25b)][_0x34434c(0x24b)](this);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x2d6)]=Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x4a2)],Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x4a2)]=function(){const _0x45486a=_0x4cad34;return $gameMap[_0x45486a(0x149)]()?this[_0x45486a(0x302)]():VisuMZ['EventsMoveCore']['Game_Player_getInputDirection'][_0x45486a(0x24b)](this);},Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x302)]=function(){const _0x232c2f=_0x4cad34;return Input[_0x232c2f(0x21d)];},Game_Player['prototype'][_0x4cad34(0x154)]=function(){const _0x5d7b3c=_0x4cad34;if($gameSystem[_0x5d7b3c(0x1f9)]())return 0x0;if(!this[_0x5d7b3c(0x529)]()&&this[_0x5d7b3c(0x4c7)]()){if(_0x5d7b3c(0x58e)!==_0x5d7b3c(0x58e))_0x33dc74[_0x5d7b3c(0x4d9)]();else{let _0x136a09=this['getInputDirection']();if(_0x136a09>0x0){if(_0x5d7b3c(0x5ec)!==_0x5d7b3c(0x5ec)){const _0x55a0ad=_0x3448d5[_0x4dc614['randomInt'](_0x36dcef[_0x5d7b3c(0x207)])];return _0x307362['x']=_0x55a0ad[0x0],_0x1eef20['y']=_0x55a0ad[0x1],this[_0x5d7b3c(0x4b8)](_0x51110d),!![];}else $gameTemp[_0x5d7b3c(0x12b)]();}else{if($gameTemp[_0x5d7b3c(0x329)]()){if(_0x5d7b3c(0x541)===_0x5d7b3c(0x541)){const _0x2f8e95=$gameTemp[_0x5d7b3c(0x19e)](),_0x4ee405=$gameTemp[_0x5d7b3c(0x1e1)](),_0x2c44da=$gameMap[_0x5d7b3c(0x149)](),_0x3b53ea=$gameMap[_0x5d7b3c(0x119)](_0x2f8e95,_0x4ee405),_0x3466aa=$gameMap[_0x5d7b3c(0x456)](_0x2f8e95,_0x4ee405)[_0x5d7b3c(0x207)]<=0x0;_0x2c44da&&_0x3b53ea&&_0x3466aa?_0x136a09=this[_0x5d7b3c(0x36d)](_0x2f8e95,_0x4ee405):_0x136a09=this['findDirectionTo'](_0x2f8e95,_0x4ee405);}else this['despawnEventId'](_0x4ec057[_0x5d7b3c(0x1a9)]);}}_0x136a09>0x0?(this['_inputTime']=this[_0x5d7b3c(0x1ea)]||0x0,this['isTurnInPlace']()?this['setDirection'](_0x136a09):this[_0x5d7b3c(0x263)](_0x136a09),this['_inputTime']++):this[_0x5d7b3c(0x1ea)]=0x0;}}},Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x22b)]=function(){const _0x5121e6=_0x4cad34,_0x741cb9=VisuMZ[_0x5121e6(0x5b2)][_0x5121e6(0x2f1)][_0x5121e6(0x4ac)];if(!_0x741cb9[_0x5121e6(0x135)])return![];if($gameTemp[_0x5121e6(0x329)]())return![];if(this[_0x5121e6(0x4be)]()||this[_0x5121e6(0x529)]()||this[_0x5121e6(0x480)]())return![];return this[_0x5121e6(0x1ea)]<_0x741cb9[_0x5121e6(0x56f)];},VisuMZ['EventsMoveCore']['Game_Player_executeMove']=Game_Player[_0x4cad34(0x3a4)]['executeMove'],Game_Player[_0x4cad34(0x3a4)]['executeMove']=function(_0x59819b){const _0x2539c3=_0x4cad34;$gameMap['isSupportDiagonalMovement']()?this[_0x2539c3(0x1be)](_0x59819b):VisuMZ['EventsMoveCore'][_0x2539c3(0x35f)][_0x2539c3(0x24b)](this,_0x59819b);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x14b)]=Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x2b2)],Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x2b2)]=function(_0x33528b,_0x68c813,_0x1bf5ac){const _0x550800=_0x4cad34;if($gameMap[_0x550800(0x1c5)](_0x33528b,_0x68c813,_0x1bf5ac,_0x550800(0x2da)))return this[_0x550800(0x3be)]()&&this['vehicle']()?this[_0x550800(0x463)]()[_0x550800(0x2b2)](_0x33528b,_0x68c813,_0x1bf5ac):!![];if($gameMap['isRegionForbidPass'](_0x33528b,_0x68c813,_0x1bf5ac,_0x550800(0x2da)))return![];return VisuMZ['EventsMoveCore']['Game_Player_isMapPassable'][_0x550800(0x24b)](this,_0x33528b,_0x68c813,_0x1bf5ac);},VisuMZ[_0x4cad34(0x5b2)]['Game_Player_checkEventTriggerHere']=Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x4a9)],Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x4a9)]=function(_0x5c6de4){const _0x16596c=_0x4cad34;VisuMZ[_0x16596c(0x5b2)][_0x16596c(0x3dc)]['call'](this,_0x5c6de4);if(this[_0x16596c(0x19d)]()){this['checkEventTriggerEventsMoveCore'](_0x5c6de4);if(_0x5c6de4[_0x16596c(0x165)](0x0)&&this[_0x16596c(0x15e)]()===_0x16596c(0x363)){if(_0x16596c(0x3af)===_0x16596c(0x3af))this[_0x16596c(0x52a)](this['x'],this['y']);else return this[_0x16596c(0x463)]()[_0x16596c(0x5e4)]()[_0x16596c(0x12a)](/\[VS8\]/i);}else(_0x5c6de4[_0x16596c(0x165)](0x1)||_0x5c6de4[_0x16596c(0x165)](0x2))&&(_0x16596c(0x1a8)!=='uZhdB'?(_0x4f8eb9[_0x16596c(0x5b2)]['Game_Event_locate']['call'](this,_0x5938b1,_0x2d6e4e),this[_0x16596c(0x3a5)]=_0x592e59,this[_0x16596c(0x575)]=_0x2d4c58,this[_0x16596c(0x361)]()):this[_0x16596c(0x136)]());}},VisuMZ['EventsMoveCore'][_0x4cad34(0x433)]=Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x3bc)],Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x3bc)]=function(_0x9d2de8){const _0x4e6d8a=_0x4cad34;VisuMZ[_0x4e6d8a(0x5b2)][_0x4e6d8a(0x433)][_0x4e6d8a(0x24b)](this,_0x9d2de8);if(this['canStartLocalEvents']()&&_0x9d2de8[_0x4e6d8a(0x165)](0x0)&&this[_0x4e6d8a(0x15e)]()===_0x4e6d8a(0x4de)){const _0x406ac4=this[_0x4e6d8a(0x2a1)](),_0x5023d7=$gameMap[_0x4e6d8a(0x3d4)](this['x'],_0x406ac4),_0x12075a=$gameMap[_0x4e6d8a(0x39c)](this['y'],_0x406ac4);this['startMapCommonEventOnOK'](_0x5023d7,_0x12075a);}},Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x46d)]=function(_0x23b98f){const _0xd1d94c=_0x4cad34;if($gameMap[_0xd1d94c(0x2e3)]())return;if($gameMap['isAnyEventStarting']())return;const _0x47d655=$gameMap[_0xd1d94c(0x303)]();for(const _0x3a1b69 of _0x47d655){if(!_0x3a1b69)continue;if(!_0x3a1b69[_0xd1d94c(0x10f)](_0x23b98f))continue;if(this['meetActivationRegionConditions'](_0x3a1b69))return _0x3a1b69[_0xd1d94c(0x2dc)]();if(this[_0xd1d94c(0x2a6)](_0x3a1b69))return _0x3a1b69[_0xd1d94c(0x2dc)]();}},Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x4f6)]=function(_0xa3dae4){const _0x451898=_0x4cad34;if($gameMap[_0x451898(0x2e3)]())return![];if($gameMap[_0x451898(0x5c1)]())return![];return _0xa3dae4[_0x451898(0x59f)]()['includes'](this[_0x451898(0x4bf)]());},Game_Player['prototype']['meetActivationProximityConditions']=function(_0x13a156){const _0x5424d3=_0x4cad34;if($gameMap['isEventRunning']())return![];if($gameMap[_0x5424d3(0x5c1)]())return![];if([_0x5424d3(0x3bf),_0x5424d3(0x2c4)][_0x5424d3(0x165)](_0x13a156[_0x5424d3(0x2ee)]()))return![];const _0x9d193=_0x13a156[_0x5424d3(0x2ee)](),_0x47ddff=_0x13a156['activationProximityDistance']();switch(_0x9d193){case _0x5424d3(0x223):const _0x2b05a1=$gameMap[_0x5424d3(0x4ee)](this['x'],this['y'],_0x13a156['x'],_0x13a156['y']);return _0x13a156['activationProximityDistance']()>=_0x2b05a1;break;case'square':return _0x47ddff>=Math['abs'](_0x13a156['deltaXFrom'](this['x']))&&_0x47ddff>=Math[_0x5424d3(0x2f6)](_0x13a156['deltaYFrom'](this['y']));break;case _0x5424d3(0x10c):return _0x47ddff>=Math[_0x5424d3(0x2f6)](_0x13a156[_0x5424d3(0x26b)](this['y']));break;case'column':return _0x47ddff>=Math[_0x5424d3(0x2f6)](_0x13a156['deltaXFrom'](this['x']));break;case'default':return![];break;}},Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x52a)]=function(_0x8a878f,_0x401d3d){const _0x47fd70=_0x4cad34;if($gameMap[_0x47fd70(0x2e3)]())return;if($gameMap[_0x47fd70(0x5c1)]())return;let _0x1454b9=VisuMZ[_0x47fd70(0x5b2)]['Settings'][_0x47fd70(0x309)],_0x110aab=$gameMap[_0x47fd70(0x4bf)](_0x8a878f,_0x401d3d);const _0x487684=_0x47fd70(0x1af)['format'](_0x110aab);_0x1454b9[_0x487684]&&$gameTemp[_0x47fd70(0x1c1)](_0x1454b9[_0x487684]);},Game_Player['prototype'][_0x4cad34(0x15e)]=function(){const _0x36cab1=_0x4cad34;return VisuMZ['EventsMoveCore'][_0x36cab1(0x2f1)]['RegionOkTarget'];},Game_Player[_0x4cad34(0x3a4)][_0x4cad34(0x136)]=function(){const _0x54a53f=_0x4cad34;if($gameMap['isEventRunning']())return;if($gameMap['isAnyEventStarting']())return;let _0x55bcb2=VisuMZ['EventsMoveCore']['Settings'][_0x54a53f(0x382)];const _0xb2d1d5=_0x54a53f(0x1af)[_0x54a53f(0x417)](this[_0x54a53f(0x4bf)]());_0x55bcb2[_0xb2d1d5]&&$gameTemp[_0x54a53f(0x1c1)](_0x55bcb2[_0xb2d1d5]);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x491)]=Game_Player[_0x4cad34(0x3a4)]['increaseSteps'],Game_Player['prototype'][_0x4cad34(0x30b)]=function(){const _0x476c74=_0x4cad34;VisuMZ[_0x476c74(0x5b2)][_0x476c74(0x491)][_0x476c74(0x24b)](this),VisuMZ[_0x476c74(0x47d)](0x0);},VisuMZ['EventsMoveCore']['Game_Follower_initialize']=Game_Follower[_0x4cad34(0x3a4)][_0x4cad34(0x532)],Game_Follower[_0x4cad34(0x3a4)][_0x4cad34(0x532)]=function(_0xa38f71){const _0x374f21=_0x4cad34;VisuMZ[_0x374f21(0x5b2)]['Game_Follower_initialize'][_0x374f21(0x24b)](this,_0xa38f71),this[_0x374f21(0x565)]=![];},Game_Follower[_0x4cad34(0x3a4)][_0x4cad34(0x4be)]=function(){return $gamePlayer['isDashing']();},Game_Follower['prototype'][_0x4cad34(0x17b)]=function(){const _0x4cfde1=_0x4cad34;return $gamePlayer[_0x4cfde1(0x17b)]();},Game_Follower[_0x4cad34(0x3a4)][_0x4cad34(0x4b2)]=function(){const _0x139e2d=_0x4cad34;return $gamePlayer[_0x139e2d(0x4b2)]();},Game_Follower[_0x4cad34(0x3a4)]['setChaseOff']=function(_0x7fb856){this['_chaseOff']=_0x7fb856;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x495)]=Game_Follower[_0x4cad34(0x3a4)][_0x4cad34(0x557)],Game_Follower[_0x4cad34(0x3a4)][_0x4cad34(0x557)]=function(_0x2893ad){const _0x498463=_0x4cad34;if(this[_0x498463(0x565)])return;if($gameSystem[_0x498463(0x20e)]())return;VisuMZ[_0x498463(0x5b2)][_0x498463(0x495)][_0x498463(0x24b)](this,_0x2893ad);},VisuMZ['EventsMoveCore']['Game_Vehicle_isMapPassable']=Game_Vehicle[_0x4cad34(0x3a4)][_0x4cad34(0x2b2)],Game_Vehicle[_0x4cad34(0x3a4)][_0x4cad34(0x2b2)]=function(_0x229f59,_0x4e9472,_0x5b852b){const _0x5b9df1=_0x4cad34;if($gameMap[_0x5b9df1(0x1c5)](_0x229f59,_0x4e9472,_0x5b852b,this[_0x5b9df1(0xf2)]))return!![];if($gameMap[_0x5b9df1(0x12d)](_0x229f59,_0x4e9472,_0x5b852b,this[_0x5b9df1(0xf2)]))return![];return VisuMZ[_0x5b9df1(0x5b2)][_0x5b9df1(0x469)][_0x5b9df1(0x24b)](this,_0x229f59,_0x4e9472,_0x5b852b);},Game_Vehicle[_0x4cad34(0x3a4)]['isAirshipPassable']=function(_0x4e2b50,_0x5e629d,_0x2bd704){const _0xeda920=_0x4cad34;if($gameMap[_0xeda920(0x1c5)](_0x4e2b50,_0x5e629d,_0x2bd704,this['_type']))return!![];if($gameMap['isRegionForbidPass'](_0x4e2b50,_0x5e629d,_0x2bd704,this[_0xeda920(0xf2)]))return![];return VisuMZ['EventsMoveCore'][_0xeda920(0x41a)][_0xeda920(0x24b)]($gamePlayer,_0x4e2b50,_0x5e629d,_0x2bd704);},VisuMZ['EventsMoveCore'][_0x4cad34(0x11f)]=Game_Vehicle[_0x4cad34(0x3a4)]['isLandOk'],Game_Vehicle[_0x4cad34(0x3a4)]['isLandOk']=function(_0x8b52a1,_0x216248,_0x9c8895){const _0x16214c=_0x4cad34;if($gameMap[_0x16214c(0x5c3)](_0x8b52a1,_0x216248,_0x9c8895,this[_0x16214c(0xf2)]))return!![];const _0x27c11f=this['_type'][_0x16214c(0x19b)](0x0)[_0x16214c(0x5ca)]()+this['_type'][_0x16214c(0x465)](0x1),_0xd0f8f2=_0x16214c(0x256)[_0x16214c(0x417)](_0x27c11f);if(VisuMZ['EventsMoveCore'][_0x16214c(0x2f1)][_0x16214c(0x41e)][_0xd0f8f2])return![];else{if(_0x16214c(0x2e8)!==_0x16214c(0x428))return VisuMZ[_0x16214c(0x5b2)][_0x16214c(0x11f)][_0x16214c(0x24b)](this,_0x8b52a1,_0x216248,_0x9c8895);else{_0x4077c5[_0x16214c(0x5b2)]['Game_Player_checkEventTriggerThere'][_0x16214c(0x24b)](this,_0x483953);if(this['canStartLocalEvents']()&&_0x1c6b56[_0x16214c(0x165)](0x0)&&this[_0x16214c(0x15e)]()===_0x16214c(0x4de)){const _0x1d7707=this['direction'](),_0x14be6e=_0x13350b[_0x16214c(0x3d4)](this['x'],_0x1d7707),_0x380ad0=_0x5aec39['roundYWithDirection'](this['y'],_0x1d7707);this[_0x16214c(0x52a)](_0x14be6e,_0x380ad0);}}}},VisuMZ[_0x4cad34(0x5b2)]['Game_Vehicle_initMoveSpeed']=Game_Vehicle['prototype']['initMoveSpeed'],Game_Vehicle[_0x4cad34(0x3a4)][_0x4cad34(0x398)]=function(){const _0x1b0f1e=_0x4cad34;VisuMZ[_0x1b0f1e(0x5b2)]['Game_Vehicle_initMoveSpeed'][_0x1b0f1e(0x24b)](this);const _0x1ecb51=VisuMZ[_0x1b0f1e(0x5b2)][_0x1b0f1e(0x2f1)][_0x1b0f1e(0x4ac)];if(this[_0x1b0f1e(0x4d0)]()){if(_0x1ecb51['BoatSpeed'])this[_0x1b0f1e(0x3cf)](_0x1ecb51['BoatSpeed']);}else{if(this[_0x1b0f1e(0x5df)]()){if(_0x1ecb51[_0x1b0f1e(0x5e8)])this[_0x1b0f1e(0x3cf)](_0x1ecb51[_0x1b0f1e(0x5e8)]);}else{if(this[_0x1b0f1e(0x259)]()){if(_0x1ecb51[_0x1b0f1e(0x202)])this[_0x1b0f1e(0x3cf)](_0x1ecb51[_0x1b0f1e(0x202)]);}}}},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0xf0)]=Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x532)],Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x532)]=function(_0x31adce,_0x32771b){const _0x3f90b5=_0x4cad34;VisuMZ[_0x3f90b5(0x5b2)][_0x3f90b5(0xf0)][_0x3f90b5(0x24b)](this,_0x31adce,_0x32771b),this['setupCopyEvent'](),this[_0x3f90b5(0x51f)](),this[_0x3f90b5(0x3fd)]();},Game_Map[_0x4cad34(0x3a4)][_0x4cad34(0x3f7)]=function(_0xd85c95,_0xe4460f){const _0x1c6d18=_0x4cad34;if(_0xd85c95===$gameMap['mapId']())return $dataMap['events'][_0xe4460f];else{if('rtBep'!==_0x1c6d18(0x567))return VisuMZ[_0x1c6d18(0x262)][_0xd85c95][_0x1c6d18(0x303)][_0xe4460f];else this[_0x1c6d18(0x5be)]['_character'][_0x1c6d18(0x213)](_0x3d0d47,this[_0x1c6d18(0x54e)]);}},VisuMZ['EventsMoveCore'][_0x4cad34(0x5ee)]=Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x199)],Game_Event[_0x4cad34(0x3a4)]['event']=function(){const _0x3572ec=_0x4cad34;if(this['_eventMorphData']!==undefined){if(_0x3572ec(0xee)!=='Ohylj')this[_0x3572ec(0x3a1)]=![];else{const _0x2df627=this[_0x3572ec(0x285)]['mapId'],_0x23e066=this[_0x3572ec(0x285)]['eventId'];return $gameMap[_0x3572ec(0x3f7)](_0x2df627,_0x23e066);}}if(this[_0x3572ec(0x55d)]!==undefined){if('mPrLc'===_0x3572ec(0x2c3)){const _0x553185=this[_0x3572ec(0x55d)][_0x3572ec(0x574)],_0x7d8b38=this[_0x3572ec(0x55d)][_0x3572ec(0x477)];return $gameMap['referEvent'](_0x553185,_0x7d8b38);}else return this[_0x3572ec(0x558)]()?this[_0x3572ec(0x486)]():this[_0x3572ec(0x5e1)]();}if(this['_eventSpawnData']!==undefined){const _0x4ff83f=this[_0x3572ec(0x1c9)][_0x3572ec(0x574)],_0x4be41f=this[_0x3572ec(0x1c9)]['eventId'];return $gameMap['referEvent'](_0x4ff83f,_0x4be41f);}if($gameTemp[_0x3572ec(0x32c)]!==undefined){const _0x171969=$gameTemp[_0x3572ec(0x32c)]['mapId'],_0x48f191=$gameTemp[_0x3572ec(0x32c)]['eventId'];return $gameMap[_0x3572ec(0x3f7)](_0x171969,_0x48f191);}return VisuMZ[_0x3572ec(0x5b2)][_0x3572ec(0x5ee)]['call'](this);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x551)]=function(_0x3e3e75,_0x3c1f5c){const _0x39c4ab=_0x4cad34;if(_0x3e3e75===0x0||_0x3c1f5c===0x0)return![];if(!VisuMZ[_0x39c4ab(0x262)][_0x3e3e75]&&_0x3e3e75!==$gameMap[_0x39c4ab(0x574)]())return $gameTemp[_0x39c4ab(0x1e3)]()&&console['log'](_0x39c4ab(0x3fb)['format'](_0x3e3e75)),![];return!![];},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x536)]=Game_Event[_0x4cad34(0x3a4)]['start'],Game_Event['prototype'][_0x4cad34(0x2dc)]=function(){const _0x358d88=_0x4cad34;VisuMZ['EventsMoveCore'][_0x358d88(0x536)][_0x358d88(0x24b)](this),Imported[_0x358d88(0x320)]&&Input[_0x358d88(0x266)](VisuMZ[_0x358d88(0x5f9)][_0x358d88(0x2f1)][_0x358d88(0x2b5)][_0x358d88(0x5bf)])&&Input[_0x358d88(0x133)]();},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x17c)]=function(){const _0x8991cf=_0x4cad34,_0x2d18f3=this[_0x8991cf(0x199)]()[_0x8991cf(0x423)];if(_0x2d18f3==='')return;if(DataManager[_0x8991cf(0x450)]()||DataManager['isEventTest']())return;const _0x377977=VisuMZ[_0x8991cf(0x5b2)][_0x8991cf(0x2f1)][_0x8991cf(0x3f4)];let _0x43dad8=null,_0x412efe=0x0,_0x300908=0x0;if(_0x2d18f3[_0x8991cf(0x12a)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x412efe=Number(RegExp['$1']),_0x300908=Number(RegExp['$2']);else{if(_0x2d18f3[_0x8991cf(0x12a)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if(_0x8991cf(0x5b6)!==_0x8991cf(0x471))_0x412efe=Number(RegExp['$1']),_0x300908=Number(RegExp['$2']);else{const _0x5d20e3=_0x4941fc[_0x8991cf(0x5b2)][_0x8991cf(0x460)]['call'](this),_0x5e6e26=_0x335fa6[_0x8991cf(0x5b2)][_0x8991cf(0x238)][_0x8991cf(0x1a2)][_0x8991cf(0x312)](_0x17fd77=>_0x12a3cb[_0x17fd77]);return _0x5d20e3['concat'](_0x5e6e26)[_0x8991cf(0x375)]((_0x56acde,_0x39d915,_0x1305a9)=>_0x1305a9[_0x8991cf(0x1c6)](_0x56acde)===_0x39d915);}}else{if(_0x2d18f3[_0x8991cf(0x12a)](/<COPY EVENT:[ ](.*?)>/i)){const _0x2151d7=String(RegExp['$1'])[_0x8991cf(0x5ca)]()[_0x8991cf(0x2c6)]();_0x43dad8=VisuMZ[_0x8991cf(0x389)][_0x2151d7];if(!_0x43dad8)return;_0x412efe=_0x43dad8[_0x8991cf(0x20c)],_0x300908=_0x43dad8[_0x8991cf(0x1e8)];}}}if(!this['checkValidEventerMap'](_0x412efe,_0x300908))return;_0x377977['PreCopyJS']['call'](this,_0x412efe,_0x300908,this);if(_0x43dad8)_0x43dad8[_0x8991cf(0x2f8)]['call'](this,_0x412efe,_0x300908,this);this['_eventCopyData']={'mapId':_0x412efe,'eventId':_0x300908},this[_0x8991cf(0x5f5)]=-0x2,this[_0x8991cf(0x4d9)](),_0x377977[_0x8991cf(0x4d8)][_0x8991cf(0x24b)](this,_0x412efe,_0x300908,this);if(_0x43dad8)_0x43dad8['PostCopyJS'][_0x8991cf(0x24b)](this,_0x412efe,_0x300908,this);$gameMap[_0x8991cf(0x107)]();},Game_Event['prototype'][_0x4cad34(0x51f)]=function(){const _0x352d47=_0x4cad34,_0x3aed21=$gameSystem[_0x352d47(0x484)](this);if(!_0x3aed21)return;const _0x3b1798=_0x3aed21[_0x352d47(0x5d8)][_0x352d47(0x5ca)]()[_0x352d47(0x2c6)]();_0x3b1798!==_0x352d47(0x1bd)?this['morphIntoTemplate'](_0x3b1798,!![]):this[_0x352d47(0x380)](_0x3aed21[_0x352d47(0x574)],_0x3aed21['eventId'],!![]);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x380)]=function(_0x59219f,_0x6555f9,_0x8f27a9){const _0x33574d=_0x4cad34;if(!this['checkValidEventerMap'](_0x59219f,_0x6555f9))return;const _0x28cb97=VisuMZ[_0x33574d(0x5b2)]['Settings'][_0x33574d(0x3f4)];if(!_0x8f27a9)_0x28cb97['PreMorphJS']['call'](this,_0x59219f,_0x6555f9,this);this[_0x33574d(0x285)]={'mapId':_0x59219f,'eventId':_0x6555f9},this[_0x33574d(0x5f5)]=-0x2,this[_0x33574d(0x4d9)]();if(!_0x8f27a9)_0x28cb97[_0x33574d(0x283)][_0x33574d(0x24b)](this,_0x59219f,_0x6555f9,this);$gameMap[_0x33574d(0x107)]();},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x3f2)]=function(_0x2f20b1,_0x18b36c){const _0x443fb0=_0x4cad34;_0x2f20b1=_0x2f20b1['toUpperCase']()['trim']();const _0x5120c0=VisuMZ[_0x443fb0(0x389)][_0x2f20b1];if(!_0x5120c0)return;const _0x492125=_0x5120c0[_0x443fb0(0x20c)],_0x2addd0=_0x5120c0[_0x443fb0(0x1e8)];if(!this['checkValidEventerMap'](_0x492125,_0x2addd0))return;if(!_0x18b36c)_0x5120c0['PreMorphJS'][_0x443fb0(0x24b)](this,_0x492125,_0x2addd0,this);this['morphInto'](_0x492125,_0x2addd0,_0x18b36c);if(!_0x18b36c)_0x5120c0['PostMorphJS']['call'](this,_0x492125,_0x2addd0,this);if($gameMap)$gameMap[_0x443fb0(0x107)]();},Game_Event['prototype'][_0x4cad34(0x18c)]=function(){const _0x97e338=_0x4cad34;this[_0x97e338(0x285)]=undefined,this[_0x97e338(0x5f5)]=-0x2,this[_0x97e338(0x4d9)]();},Game_Event['prototype'][_0x4cad34(0x2f3)]=function(_0x48b46f){const _0xa9fc1f=_0x4cad34,_0xa4b7b2=VisuMZ[_0xa9fc1f(0x5b2)][_0xa9fc1f(0x2f1)][_0xa9fc1f(0x3f4)],_0x5008fd=_0x48b46f[_0xa9fc1f(0x5d8)][_0xa9fc1f(0x5ca)]()[_0xa9fc1f(0x2c6)](),_0x5c29d4=!['','UNTITLED'][_0xa9fc1f(0x165)](_0x5008fd);let _0x3bbf47=0x0,_0x46a62a=0x0;if(_0x5c29d4){const _0x36f6dd=VisuMZ[_0xa9fc1f(0x389)][_0x5008fd];if(!_0x36f6dd)return;_0x3bbf47=_0x36f6dd[_0xa9fc1f(0x20c)],_0x46a62a=_0x36f6dd[_0xa9fc1f(0x1e8)];}else _0x3bbf47=_0x48b46f[_0xa9fc1f(0x574)],_0x46a62a=_0x48b46f['eventId'];if(!this['checkValidEventerMap'](_0x3bbf47,_0x46a62a))return;if(_0x5c29d4){const _0x251d2a=VisuMZ[_0xa9fc1f(0x389)][_0x5008fd];_0x251d2a[_0xa9fc1f(0x583)][_0xa9fc1f(0x24b)](this,_0x3bbf47,_0x46a62a,this);}_0xa4b7b2[_0xa9fc1f(0x583)][_0xa9fc1f(0x24b)](this,_0x3bbf47,_0x46a62a,this),this[_0xa9fc1f(0x1c9)]=_0x48b46f,this[_0xa9fc1f(0x5f5)]=-0x2,this[_0xa9fc1f(0x2c8)]=$gameMap[_0xa9fc1f(0x574)](),this[_0xa9fc1f(0x1a9)]=_0x48b46f[_0xa9fc1f(0x3d9)],this['_spawnPreserved']=_0x48b46f[_0xa9fc1f(0x54f)],this[_0xa9fc1f(0x2cd)](_0x48b46f['x'],_0x48b46f['y']),this[_0xa9fc1f(0x376)](_0x48b46f['direction']),this['refresh']();if(_0x5c29d4){const _0xe7f6db=VisuMZ[_0xa9fc1f(0x389)][_0x5008fd];if(!_0xe7f6db)return;_0xe7f6db['PostSpawnJS'][_0xa9fc1f(0x24b)](this,_0x3bbf47,_0x46a62a,this);}_0xa4b7b2[_0xa9fc1f(0x544)]['call'](this,_0x3bbf47,_0x46a62a,this);const _0x26f1e5=SceneManager[_0xa9fc1f(0x568)];if(_0x26f1e5&&_0x26f1e5[_0xa9fc1f(0x1b5)])_0x26f1e5[_0xa9fc1f(0x1b5)][_0xa9fc1f(0x5d1)](this);},Game_Event[_0x4cad34(0x3a4)]['isSpawnedEvent']=function(){const _0x3324f0=_0x4cad34;return!!this[_0x3324f0(0x1c9)];},VisuMZ['EventsMoveCore'][_0x4cad34(0x436)]=Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x429)],Game_Event[_0x4cad34(0x3a4)]['clearPageSettings']=function(){const _0x5e5650=_0x4cad34;VisuMZ[_0x5e5650(0x5b2)][_0x5e5650(0x436)][_0x5e5650(0x24b)](this),this[_0x5e5650(0x1de)]();},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x41d)]=Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x29d)],Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x29d)]=function(){const _0x44362c=_0x4cad34;this[_0x44362c(0x198)]=!![],VisuMZ[_0x44362c(0x5b2)][_0x44362c(0x41d)][_0x44362c(0x24b)](this),this[_0x44362c(0x3e2)](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event[_0x4cad34(0x3a4)]['setupEventsMoveCoreEffects']=function(){const _0x316807=_0x4cad34;if(!this['event']())return;this['initEventsMoveCoreEffects'](),this[_0x316807(0x54a)](),this[_0x316807(0x3e5)](),this[_0x316807(0x3f0)]();},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x54a)]=function(){const _0x15c563=_0x4cad34,_0x1f3d6e=this[_0x15c563(0x199)]()[_0x15c563(0x423)];if(_0x1f3d6e==='')return;this[_0x15c563(0x21b)](_0x1f3d6e);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x3e5)]=function(){const _0x158923=_0x4cad34;if(!this[_0x158923(0x31c)]())return;const _0x6eabd3=this[_0x158923(0x1bc)]();let _0x1e402f='';for(const _0x1d78c of _0x6eabd3){if(_0x158923(0x448)===_0x158923(0x448)){if([0x6c,0x198][_0x158923(0x165)](_0x1d78c[_0x158923(0x123)])){if(_0x1e402f!=='')_0x1e402f+='\x0a';_0x1e402f+=_0x1d78c[_0x158923(0x243)][0x0];}}else{const _0x3072ea=this[_0x158923(0x3a5)],_0x45c139=this[_0x158923(0x575)];return this[_0x158923(0x332)](_0x3072ea,_0x45c139);}}this['checkEventsMoveCoreStringTags'](_0x1e402f);},Game_Event['prototype'][_0x4cad34(0x1de)]=function(){const _0x431858=_0x4cad34,_0x190c34=VisuMZ[_0x431858(0x5b2)]['Settings'];this[_0x431858(0x5d4)]={'type':_0x431858(0x3bf),'distance':0x0,'regionList':[]},this[_0x431858(0x15f)]=![],this[_0x431858(0x1fe)](),this[_0x431858(0x38f)]=![],this[_0x431858(0x52d)]=![],this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x431858(0x3c3)]=$gameSystem[_0x431858(0x257)](this),this[_0x431858(0x2d9)]={'text':'','visibleRange':_0x190c34[_0x431858(0x28f)][_0x431858(0x42f)],'offsetX':_0x190c34[_0x431858(0x28f)][_0x431858(0x267)],'offsetY':_0x190c34[_0x431858(0x28f)][_0x431858(0x281)]},this[_0x431858(0x470)]=![],this[_0x431858(0x2ea)]=[],this[_0x431858(0x2d7)]={'target':-0x1,'type':_0x431858(0x549),'delay':0x1,'opacityDelta':0x0},this['_randomMoveWeight']=_0x190c34['Movement'][_0x431858(0x4cc)]??0x0,this[_0x431858(0x5a3)]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x190c34[_0x431858(0x4ac)]['DefaultShadow']},this[_0x431858(0x55a)](),this[_0x431858(0x364)]();},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x21b)]=function(_0x509f73){const _0x137556=_0x4cad34;if(_0x509f73[_0x137556(0x12a)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x137556(0x45e)==='fCmoO')this['_activationProximity'][_0x137556(0x224)]=JSON[_0x137556(0x265)]('['+RegExp['$1']['match'](/\d+/g)+']'),this[_0x137556(0x5d4)][_0x137556(0x3da)]=_0x137556(0x2c4);else{if([0x2,0x4,0x6,0x8][_0x137556(0x165)](_0x2bbcfb))return 0x4;if([0x1,0x3,0x7,0x9][_0x137556(0x165)](_0x55b40b))return 0x5;}}else _0x509f73['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x137556(0x2c6)](),this[_0x137556(0x5d4)][_0x137556(0x3da)]=type,this[_0x137556(0x5d4)][_0x137556(0x4ee)]=Number(RegExp['$2']));_0x509f73['match'](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)&&(this[_0x137556(0x1b2)][_0x137556(0x482)]=String(RegExp['$1']));if(_0x509f73['match'](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){if(_0x137556(0x288)!==_0x137556(0x288))_0x1b6f5d[_0x137556(0x5fe)][_0x137556(0x3c4)](_0x3b2957);else{const _0x4aa1cd=String(RegExp['$1'])['toUpperCase']()[_0x137556(0x2c6)](),_0x424072=[_0x137556(0x56a),'ADDITIVE','MULTIPLY',_0x137556(0x58f)];this[_0x137556(0x1b2)][_0x137556(0x5fd)]=_0x424072[_0x137556(0x1c6)](_0x4aa1cd)[_0x137556(0x229)](0x0,0x3);}}if(_0x509f73[_0x137556(0x12a)](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)){if(_0x137556(0x591)!=='DThZE')this[_0x137556(0x1b2)][_0x137556(0x5a4)]=Number(RegExp['$1']);else return _0x2965e9[_0x137556(0x5b2)][_0x137556(0x2f1)]['Label']['OpacitySpeed'];}_0x509f73['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x137556(0x1b2)][_0x137556(0x27f)]=Number(RegExp['$1']));_0x509f73[_0x137556(0x12a)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x137556(0x3e9)==='CbquM'?_0x4c52b4[_0x137556(0x1c1)](_0x57145a[_0x1b25ce]):this[_0x137556(0x1b2)][_0x137556(0x31e)]=Number(RegExp['$1']));if(_0x509f73[_0x137556(0x12a)](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x137556(0x2ff)===_0x137556(0x2ff))this['_attachPicture'][_0x137556(0x27f)]=Number(RegExp['$1']),this[_0x137556(0x1b2)][_0x137556(0x31e)]=Number(RegExp['$2']);else return!![];}_0x509f73['match'](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&('UkFkt'!==_0x137556(0x304)?_0x4590d[_0x137556(0x5b2)][_0x137556(0x109)][_0x137556(0x24b)](this):this['_attachPicture'][_0x137556(0x26f)]=Number(RegExp['$1'])*0.01);_0x509f73[_0x137556(0x12a)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x137556(0x15f)]=!![]);_0x509f73[_0x137556(0x12a)](/<CLICK TRIGGER>/i)&&(this[_0x137556(0x38f)]=!![]);if(_0x509f73[_0x137556(0x12a)](/<CUSTOM Z:[ ](.*?)>/i)){if(_0x137556(0x3b5)==='WIRoe')this['_customZ']=Number(RegExp['$1'])||0x0;else return this[_0x137556(0x4d2)]();}const _0x3a74f7=_0x509f73['match'](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x3a74f7)for(const _0x191e90 of _0x3a74f7){if(_0x191e90[_0x137556(0x12a)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x4af732=String(RegExp['$1'])[_0x137556(0x1f8)]()[_0x137556(0x2c6)](),_0x4bd46f=Number(RegExp['$2']);this[_0x137556(0x3fc)][_0x4af732]=_0x4bd46f;}}_0x509f73[_0x137556(0x12a)](/<ICON:[ ](\d+)>/i)&&(this[_0x137556(0x3c3)][_0x137556(0x12e)]=Number(RegExp['$1']));_0x509f73['match'](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x137556(0x3c3)][_0x137556(0x39f)]=Number(RegExp['$1']));if(_0x509f73['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x137556(0x59b)===_0x137556(0x4dd))return![];else this[_0x137556(0x3c3)][_0x137556(0x505)]=Number(RegExp['$1']);}_0x509f73[_0x137556(0x12a)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x137556(0x3c3)][_0x137556(0x39f)]=Number(RegExp['$1']),this[_0x137556(0x3c3)]['bufferY']=Number(RegExp['$2']));if(_0x509f73[_0x137556(0x12a)](/<ICON BLEND MODE:[ ](.*?)>/i)){if(_0x137556(0x15b)!==_0x137556(0x5bb)){const _0x18c103=String(RegExp['$1'])[_0x137556(0x5ca)]()[_0x137556(0x2c6)](),_0x5e5a89=['NORMAL','ADDITIVE',_0x137556(0x18d),_0x137556(0x58f)];this['_eventIcon'][_0x137556(0x5fd)]=_0x5e5a89[_0x137556(0x1c6)](_0x18c103)['clamp'](0x0,0x3);}else{_0xe883a5[_0x137556(0x3a4)][_0x137556(0x30b)][_0x137556(0x24b)](this);if([_0x137556(0x3bf),_0x137556(0x2c4)][_0x137556(0x165)](this['activationProximityType']()))return;_0x45d5eb[_0x137556(0x46d)]([0x2]);}}_0x509f73[_0x137556(0x12a)](/<LABEL:[ ](.*?)>/i)&&(this[_0x137556(0x2d9)][_0x137556(0x4b0)]=String(RegExp['$1'])['trim']());_0x509f73[_0x137556(0x12a)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x137556(0x2d9)][_0x137556(0x4b0)]=String(RegExp['$1'])['trim']());_0x509f73['match'](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x137556(0x2d9)][_0x137556(0x27f)]=Number(RegExp['$1']));_0x509f73[_0x137556(0x12a)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x137556(0x2d9)]['offsetY']=Number(RegExp['$1']));_0x509f73['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x137556(0x2d9)][_0x137556(0x27f)]=Number(RegExp['$1']),this[_0x137556(0x2d9)][_0x137556(0x31e)]=Number(RegExp['$2']));$gameTemp[_0x137556(0x280)](this);for(;;){if(this[_0x137556(0x2d9)]['text'][_0x137556(0x12a)](/\\V\[(\d+)\]/gi))this[_0x137556(0x2d9)][_0x137556(0x4b0)]=this[_0x137556(0x2d9)][_0x137556(0x4b0)][_0x137556(0x192)](/\\V\[(\d+)\]/gi,(_0x2f6077,_0x5d8ad8)=>$gameVariables['value'](parseInt(_0x5d8ad8)));else{if(_0x137556(0x1b9)!==_0x137556(0x1b9))return this['processMoveRouteStepToCharacter'](_0x599616);else break;}}$gameTemp['clearSelfTarget']();_0x509f73[_0x137556(0x12a)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x137556(0x2d9)][_0x137556(0x158)]=Number(RegExp['$1']));_0x509f73[_0x137556(0x12a)](/<MIRROR SPRITE>/i)&&(this['_mirrorSprite']=!![]);if(_0x509f73[_0x137556(0x12a)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if('NeJnQ'===_0x137556(0x1f6)){const _0x12ef44=JSON[_0x137556(0x265)]('['+RegExp['$1'][_0x137556(0x12a)](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x137556(0x2ea)][_0x137556(0x292)](_0x12ef44),this['_moveOnlyRegions'][_0x137556(0x269)](0x0);}else{const _0x5c8256=this[_0x137556(0x30e)](this[_0x137556(0x2a1)]());return _0x652904['roundXWithDirection'](this['x'],_0x5c8256);}}if(_0x509f73[_0x137556(0x12a)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x28a38a=String(RegExp['$1']);if(_0x28a38a[_0x137556(0x12a)](/PLAYER/i)){if(_0x137556(0x2b8)!==_0x137556(0x597))this['_moveSynch'][_0x137556(0x580)]=0x0;else{if(this[_0x137556(0x1d2)]===_0x32d94f)this[_0x137556(0xf7)]();const _0x2ffca3='Map%1-Event%2'['format'](_0x9b9981,_0x2cfa1c);this[_0x137556(0x1d2)][_0x2ffca3]={'direction':_0x229ed4,'x':_0x56a0ee['round'](_0x271374),'y':_0x4916f4['round'](_0x4df4ba),'pageIndex':_0x2a1899,'moveRouteIndex':_0x3aeb5f};}}else _0x28a38a[_0x137556(0x12a)](/EVENT[ ](\d+)/i)&&(this[_0x137556(0x2d7)][_0x137556(0x580)]=Number(RegExp['$1']));}_0x509f73['match'](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this['_moveSynch'][_0x137556(0x3da)]=String(RegExp['$1'])['toLowerCase']()['trim']());_0x509f73[_0x137556(0x12a)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x137556(0x2d7)][_0x137556(0xff)]=Number(RegExp['$1']));_0x509f73[_0x137556(0x12a)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this['_moveSynch'][_0x137556(0x38e)]=Number(RegExp['$1']));if(_0x509f73['match'](/<TRUE RANDOM MOVE>/i)){if(_0x137556(0x3f9)!=='kIEFF')this['_randomMoveWeight']=0x0;else return this[_0x137556(0x2d9)][_0x137556(0x158)];}else _0x509f73['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this['_randomMoveWeight']=Number(RegExp['$1'])||0x0);if(_0x509f73[_0x137556(0x12a)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if(_0x137556(0x104)===_0x137556(0x181))return this[_0x137556(0x178)]===_0x14bc54&&this[_0x137556(0x2d4)](),this['_forceShowPlayer'];else this[_0x137556(0x5a3)]=!![];}_0x509f73['match'](/<HIDE SHADOW>/i)&&(this[_0x137556(0x26e)][_0x137556(0x3b1)]=![]);_0x509f73[_0x137556(0x12a)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x137556(0x26e)][_0x137556(0x482)]=String(RegExp['$1']));if(_0x509f73[_0x137556(0x12a)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x137556(0x540)!==_0x137556(0x540))return this['moveAwayFromPoint'](_0x5508ee(_0x61348c['$1']),_0x2bc392(_0x5744f1['$2']));else this[_0x137556(0x236)]=Number(RegExp['$1']);}_0x509f73[_0x137556(0x12a)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetY']=Number(RegExp['$1']));_0x509f73[_0x137556(0x12a)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1']),this[_0x137556(0x2a3)]=Number(RegExp['$2']));if(_0x509f73[_0x137556(0x12a)](/<STEP PATTERN:[ ](.*)>/i)){if('hLpKH'===_0x137556(0x374))this['_stepPattern']=String(RegExp['$1'])[_0x137556(0x5ca)]()[_0x137556(0x2c6)]();else return this[_0x137556(0x480)]()&&this[_0x137556(0x4ce)]()===_0x1bb8e5[_0x137556(0x5b2)]['Settings'][_0x137556(0x2c1)][_0x137556(0x2ca)];}},Game_Event['prototype'][_0x4cad34(0x3f0)]=function(){const _0x5158b6=_0x4cad34;this[_0x5158b6(0x336)]();},Game_Event['prototype']['isNearTheScreen']=function(){const _0x538e33=_0x4cad34;if(this[_0x538e33(0x15f)])return!![];return Game_Character[_0x538e33(0x3a4)][_0x538e33(0x337)]['call'](this);},VisuMZ['EventsMoveCore']['Game_Event_updateSelfMovement']=Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x23e)],Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x23e)]=function(){const _0x2c1769=_0x4cad34;if(this[_0x2c1769(0x5ea)]())return;VisuMZ[_0x2c1769(0x5b2)][_0x2c1769(0x5d0)][_0x2c1769(0x24b)](this),this['isMoving']()&&VisuMZ['MoveAllSynchTargets'](this[_0x2c1769(0x1a9)]);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x5ea)]=function(){const _0x27470c=_0x4cad34,_0x135a1a=VisuMZ[_0x27470c(0x5b2)][_0x27470c(0x2f1)][_0x27470c(0x4ac)];if($gameMap[_0x27470c(0x2e3)]()&&_0x135a1a['StopAutoMoveEvents'])return!![];if($gameMessage['isBusy']()&&_0x135a1a[_0x27470c(0x595)])return!![];if(!$gameSystem[_0x27470c(0x573)]())return!![];if(this['moveSynchTarget']()>=0x0)return!![];return![];},Game_Event['prototype']['updateShadowChanges']=function(){const _0x2bc140=_0x4cad34,_0x58c080=SceneManager[_0x2bc140(0x568)]['_spriteset'];if(_0x58c080){const _0x1fa3b7=_0x58c080[_0x2bc140(0x254)](this);if(_0x1fa3b7&&_0x1fa3b7[_0x2bc140(0x5d9)]&&_0x1fa3b7[_0x2bc140(0x5d9)][_0x2bc140(0x310)]!==this[_0x2bc140(0x1d3)]()){if(_0x2bc140(0x3d7)!==_0x2bc140(0x3d7)){if(this[_0x2bc140(0x14d)]===_0x1640e6)this[_0x2bc140(0xf7)]();this['_expireCommonEvent']=_0x3c208e;}else _0x1fa3b7['_shadowSprite'][_0x2bc140(0x310)]=this[_0x2bc140(0x1d3)](),_0x1fa3b7[_0x2bc140(0x5d9)]['bitmap']=ImageManager['loadSystem'](_0x1fa3b7[_0x2bc140(0x5d9)][_0x2bc140(0x310)]);}}},Game_Event['prototype'][_0x4cad34(0x1d3)]=function(){return this['_shadowGraphic']['filename'];},Game_Event['prototype']['isShadowVisible']=function(){const _0x58d117=_0x4cad34;if(!this[_0x58d117(0x26e)][_0x58d117(0x3b1)])return![];return Game_CharacterBase[_0x58d117(0x3a4)][_0x58d117(0x1c7)][_0x58d117(0x24b)](this);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x3f6)]=function(){const _0x2aa914=_0x4cad34;return this[_0x2aa914(0x2d9)]['text'];},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x466)]=function(){const _0x90b6bf=_0x4cad34;return this['_labelWindow'][_0x90b6bf(0x158)];},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x2b2)]=function(_0x42d9c1,_0x1ae7f3,_0x89acef){const _0x2e93d0=_0x4cad34;if(this[_0x2e93d0(0x4fb)]())return this['isMoveOnlyRegionPassable'](_0x42d9c1,_0x1ae7f3,_0x89acef);if($gameMap['isRegionAllowPass'](_0x42d9c1,_0x1ae7f3,_0x89acef,'event'))return!![];if($gameMap[_0x2e93d0(0x12d)](_0x42d9c1,_0x1ae7f3,_0x89acef,'event'))return![];return Game_Character[_0x2e93d0(0x3a4)][_0x2e93d0(0x2b2)][_0x2e93d0(0x24b)](this,_0x42d9c1,_0x1ae7f3,_0x89acef);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x4fb)]=function(){const _0x13b9ca=_0x4cad34;if(this[_0x13b9ca(0x2ea)]===undefined)this[_0x13b9ca(0x1de)]();return this[_0x13b9ca(0x2ea)][_0x13b9ca(0x207)]>0x0;},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x47b)]=function(_0xff0604,_0x434fab,_0x18a1e6){const _0x3af146=_0x4cad34,_0x4bf456=$gameMap[_0x3af146(0x3d4)](_0xff0604,_0x18a1e6),_0x388bb6=$gameMap[_0x3af146(0x39c)](_0x434fab,_0x18a1e6),_0x47af46=$gameMap[_0x3af146(0x4bf)](_0x4bf456,_0x388bb6);return this[_0x3af146(0x2ea)][_0x3af146(0x165)](_0x47af46);},VisuMZ['EventsMoveCore'][_0x4cad34(0x15a)]=Game_Event[_0x4cad34(0x3a4)]['findProperPageIndex'],Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x5fa)]=function(){const _0x44b158=_0x4cad34;return this[_0x44b158(0x4d5)]=![],this[_0x44b158(0x452)]=![],this[_0x44b158(0x199)]()?VisuMZ[_0x44b158(0x5b2)][_0x44b158(0x15a)][_0x44b158(0x24b)](this):-0x1;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x34f)]=Game_Event['prototype'][_0x4cad34(0x4f2)],Game_Event['prototype'][_0x4cad34(0x4f2)]=function(_0x3974fe){const _0xd68966=_0x4cad34;this[_0xd68966(0x38b)](_0x3974fe),$gameTemp[_0xd68966(0x280)](this);const _0x5840b3=VisuMZ[_0xd68966(0x5b2)][_0xd68966(0x34f)][_0xd68966(0x24b)](this,_0x3974fe);return $gameTemp['clearSelfTarget'](),_0x5840b3;},Game_Event[_0x4cad34(0x3a4)]['hasAdvancedSwitchVariable']=function(){return this['_advancedSwitchVariable'];},Game_Event[_0x4cad34(0x3a4)]['checkAdvancedSwitchVariablePresent']=function(_0x50b756){const _0x2b52f9=_0x4cad34,_0x2374ea=_0x50b756[_0x2b52f9(0x59a)];if(_0x2374ea[_0x2b52f9(0x410)]&&DataManager[_0x2b52f9(0x4cb)](_0x2374ea[_0x2b52f9(0x58a)]))this[_0x2b52f9(0x4d5)]=!![];else{if(_0x2374ea[_0x2b52f9(0x3c8)]&&DataManager[_0x2b52f9(0x4cb)](_0x2374ea[_0x2b52f9(0x5ce)])){if(_0x2b52f9(0x57e)!==_0x2b52f9(0x187))this[_0x2b52f9(0x4d5)]=!![];else{const _0x47e4c7=_0x1f8055(_0x278f10['$1']),_0x16d889=_0xc1742a(_0x3290a1['$2']),_0x3e60d1=this['checkCollisionKeywords'](_0x46bfc2);return this['processMoveRouteMoveTo'](_0x47e4c7,_0x16d889,_0x3e60d1);}}else _0x2374ea[_0x2b52f9(0x539)]&&DataManager[_0x2b52f9(0x2b1)](_0x2374ea[_0x2b52f9(0x18e)])&&('OdrgI'!==_0x2b52f9(0x57a)?(this[_0x2b52f9(0x4ab)]=_0x1bdbe2,_0x27004d['prototype'][_0x2b52f9(0x532)][_0x2b52f9(0x24b)](this),this[_0x2b52f9(0x57f)](),this[_0x2b52f9(0x321)]()):this[_0x2b52f9(0x4d5)]=!![]);}},Game_Event[_0x4cad34(0x3a4)]['hasClickTrigger']=function(){const _0x7a6a11=_0x4cad34;if(this[_0x7a6a11(0x499)])return![];return this[_0x7a6a11(0x38f)];},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0xfb)]=function(){const _0x2ed737=_0x4cad34;$gameTemp[_0x2ed737(0x12b)](),this['start']();},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x50d)]=function(_0x5ca00d,_0xbe5782){const _0x38273e=_0x4cad34;return this[_0x38273e(0x3fc)]?_0x38273e(0x284)!==_0x38273e(0x419)?this['posEventsMoveCore'](_0x5ca00d,_0xbe5782):(this[_0x38273e(0x4a8)]===_0x3e30b3&&this[_0x38273e(0x1dd)](),this[_0x38273e(0x4a8)]):Game_Character[_0x38273e(0x3a4)][_0x38273e(0x50d)][_0x38273e(0x24b)](this,_0x5ca00d,_0xbe5782);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x4af)]=function(_0x2042b8,_0x1e5a68){const _0xb21dfc=_0x4cad34;var _0x564e1f=this['x']-this[_0xb21dfc(0x3fc)]['left'],_0xe8696c=this['x']+this[_0xb21dfc(0x3fc)][_0xb21dfc(0x413)],_0x248c8c=this['y']-this[_0xb21dfc(0x3fc)]['up'],_0x106c31=this['y']+this[_0xb21dfc(0x3fc)][_0xb21dfc(0x18a)];return _0x564e1f<=_0x2042b8&&_0x2042b8<=_0xe8696c&&_0x248c8c<=_0x1e5a68&&_0x1e5a68<=_0x106c31;},Game_Event[_0x4cad34(0x3a4)]['canPass']=function(_0x2ac2f0,_0x4556bd,_0x4a8840){const _0xdafd8=_0x4cad34;for(let _0x195b43=-this['_addedHitbox'][_0xdafd8(0x424)];_0x195b43<=this[_0xdafd8(0x3fc)][_0xdafd8(0x413)];_0x195b43++){for(let _0x3da36e=-this[_0xdafd8(0x3fc)]['up'];_0x3da36e<=this[_0xdafd8(0x3fc)][_0xdafd8(0x18a)];_0x3da36e++){if(!Game_Character[_0xdafd8(0x3a4)]['canPass'][_0xdafd8(0x24b)](this,_0x2ac2f0+_0x195b43,_0x4556bd+_0x3da36e,_0x4a8840)){if(_0xdafd8(0x3cd)!==_0xdafd8(0x3cd)){if(this['constructor']===_0x1eb48b&&this[_0xdafd8(0x3be)]())return this[_0xdafd8(0x463)]()[_0xdafd8(0x5e4)]()[_0xdafd8(0x12a)](/\[VS8\]/i);else return _0x4a14b2[_0xdafd8(0x179)]&&this[_0xdafd8(0x5dd)]()?!![]:this[_0xdafd8(0x5e4)]()['match'](/\[VS8\]/i);}else return![];}}}return!![];},Game_Event[_0x4cad34(0x3a4)]['isCollidedWithEvents']=function(_0x3d6f05,_0x1ea09a){const _0x1dd768=_0x4cad34;if(Imported[_0x1dd768(0x45f)]&&this[_0x1dd768(0x4c0)]())return _0x1dd768(0x172)===_0x1dd768(0x172)?this['checkSmartEventCollision'](_0x3d6f05,_0x1ea09a):_0x1dcb5a[_0x1dd768(0x5b2)][_0x1dd768(0x24e)][_0x1dd768(0x24b)](this)+(this[_0x1dd768(0x2a3)]||0x0);else{if(_0x1dd768(0x515)!==_0x1dd768(0x515))this[_0x1dd768(0x4ab)]['labelWindowText']()!==this['_text']&&(this[_0x1dd768(0x1f3)]=this[_0x1dd768(0x4ab)][_0x1dd768(0x3f6)](),this['refresh']());else{const _0x1cbf41=$gameMap['eventsXyNt'](_0x3d6f05,_0x1ea09a)[_0x1dd768(0x375)](_0x301c69=>_0x301c69!==this);return _0x1cbf41['length']>0x0;}}},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x293)]=function(_0x3179e3,_0x3acc87){const _0x1254cf=_0x4cad34;if(!this[_0x1254cf(0x4e0)]()){if(_0x1254cf(0x3a0)!=='UbbVI')return![];else this[_0x1254cf(0x1b2)][_0x1254cf(0x26f)]=_0x242ef2(_0x2efd33['$1'])*0.01;}else{const _0x455c65=$gameMap[_0x1254cf(0x456)](_0x3179e3,_0x3acc87)['filter'](_0x39e4a2=>_0x39e4a2!==this&&_0x39e4a2[_0x1254cf(0x4e0)]());return _0x455c65[_0x1254cf(0x207)]>0x0;}},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x2ee)]=function(){const _0x2d46cd=_0x4cad34;return this[_0x2d46cd(0x5d4)][_0x2d46cd(0x3da)]||_0x2d46cd(0x3bf);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x4fd)]=function(){return this['_activationProximity']['distance']||0x0;},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x59f)]=function(){const _0x778d44=_0x4cad34;return this['_activationProximity'][_0x778d44(0x224)]||[];},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x30b)]=function(){const _0x2a8878=_0x4cad34;Game_Character['prototype'][_0x2a8878(0x30b)][_0x2a8878(0x24b)](this);if([_0x2a8878(0x3bf),_0x2a8878(0x2c4)][_0x2a8878(0x165)](this[_0x2a8878(0x2ee)]()))return;$gamePlayer[_0x2a8878(0x46d)]([0x2]);},VisuMZ[_0x4cad34(0x5b2)]['Game_Event_checkEventTriggerAuto']=Game_Event[_0x4cad34(0x3a4)]['checkEventTriggerAuto'],Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x4b1)]=function(){const _0x470483=_0x4cad34;if(this['_trigger']!==0x3)return;if(this[_0x470483(0x198)])return;if(!this[_0x470483(0x289)](![]))return;if(!this[_0x470483(0x12c)](![]))return;VisuMZ[_0x470483(0x5b2)]['Game_Event_checkEventTriggerAuto']['call'](this);},VisuMZ[_0x4cad34(0x5b2)]['Game_Event_updateParallel']=Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x1ba)],Game_Event['prototype'][_0x4cad34(0x1ba)]=function(){const _0x5c5b27=_0x4cad34;if(!this[_0x5c5b27(0x356)])return;if(!this[_0x5c5b27(0x289)](!![]))return;if(!this[_0x5c5b27(0x12c)](!![]))return;VisuMZ[_0x5c5b27(0x5b2)][_0x5c5b27(0x175)][_0x5c5b27(0x24b)](this);},Game_Event[_0x4cad34(0x3a4)]['checkRegionEventTrigger']=function(_0x15c7e7){const _0x5b8f44=_0x4cad34;if(!_0x15c7e7&&$gameMap[_0x5b8f44(0x2e3)]())return![];if(!_0x15c7e7&&$gameMap[_0x5b8f44(0x5c1)]())return![];if(this[_0x5b8f44(0x59f)]()<=0x0)return!![];return $gamePlayer['meetActivationRegionConditions'](this);},Game_Event[_0x4cad34(0x3a4)]['checkActivationProximity']=function(_0x743fdb){const _0x748ea0=_0x4cad34;if(!_0x743fdb&&$gameMap['isEventRunning']())return![];if(!_0x743fdb&&$gameMap[_0x748ea0(0x5c1)]())return![];if([_0x748ea0(0x3bf),_0x748ea0(0x2c4)]['includes'](this[_0x748ea0(0x2ee)]()))return!![];return $gamePlayer[_0x748ea0(0x2a6)](this);},VisuMZ[_0x4cad34(0x47d)]=function(_0x5995dd){const _0x44c117=_0x4cad34;for(const _0x3124d9 of $gameMap[_0x44c117(0x303)]()){if(!_0x3124d9)continue;if(_0x3124d9['moveSynchTarget']()===_0x5995dd){if('NRxka'!==_0x44c117(0x339))return _0x5c5a41[_0x44c117(0x5b2)]['Game_CharacterBase_canPass'][_0x44c117(0x24b)](this,_0x37a9d7,_0x3a3087,_0x182360);else _0x3124d9[_0x44c117(0x180)]();}}},VisuMZ[_0x4cad34(0x33a)]=function(_0x37beee){const _0x29006c=_0x4cad34;if(_0x37beee===0x0)return $gamePlayer;return $gameMap[_0x29006c(0x199)](_0x37beee);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x349)]=function(){const _0x5a5839=_0x4cad34;return this[_0x5a5839(0x2d7)]['target'];},Game_Event['prototype'][_0x4cad34(0x174)]=function(){const _0x2018ee=_0x4cad34;return this[_0x2018ee(0x2d7)][_0x2018ee(0x3da)];},Game_Event['prototype'][_0x4cad34(0x4b2)]=function(){const _0x3be39d=_0x4cad34;if(this[_0x3be39d(0x349)]()>=0x0){if('gjfnq'!=='gjfnq')return this[_0x3be39d(0x2ed)](0x3,_0x3fb82b(_0xdcf7c9['$1']));else{const _0x2e3f16=VisuMZ[_0x3be39d(0x33a)](this['moveSynchTarget']());if(_0x2e3f16)return _0x2e3f16['realMoveSpeed']();}}return Game_Character[_0x3be39d(0x3a4)][_0x3be39d(0x4b2)][_0x3be39d(0x24b)](this);},Game_Event['prototype'][_0x4cad34(0x180)]=function(){const _0x47dbcb=_0x4cad34;this[_0x47dbcb(0x2d7)][_0x47dbcb(0x5db)]=this[_0x47dbcb(0x2d7)]['timer']||0x0,this[_0x47dbcb(0x2d7)][_0x47dbcb(0x5db)]--;if(this[_0x47dbcb(0x2d7)][_0x47dbcb(0x5db)]>0x0)return;this[_0x47dbcb(0x2d7)][_0x47dbcb(0x5db)]=this[_0x47dbcb(0x2d7)][_0x47dbcb(0xff)],this[_0x47dbcb(0x255)]();},Game_Event[_0x4cad34(0x3a4)]['adjustMoveSynchOpacityDelta']=function(_0x358350){const _0x14644f=_0x4cad34;if(this['moveSynchTarget']()>=0x0){if(_0x14644f(0x422)===_0x14644f(0x34a))return this[_0x14644f(0x4be)]()&&this['_stopCount']===0x0;else{const _0x127631=VisuMZ[_0x14644f(0x33a)](this[_0x14644f(0x349)]());if(_0x127631){if(_0x14644f(0x5d6)!==_0x14644f(0x5d6))_0x1d78b2['EventsMoveCore'][_0x14644f(0x536)]['call'](this),_0x5c26a6[_0x14644f(0x320)]&&_0x182fd9[_0x14644f(0x266)](_0x359244[_0x14644f(0x5f9)][_0x14644f(0x2f1)]['General'][_0x14644f(0x5bf)])&&_0x9af69[_0x14644f(0x133)]();else{const _0x50a927=$gameMap['distance'](this[_0x14644f(0x577)],this['_realY'],_0x127631['_realX'],_0x127631[_0x14644f(0x32f)])-0x1,_0x8e8a17=Math['min']($gameMap[_0x14644f(0x556)](),$gameMap['tileHeight']()),_0x4b0c80=this[_0x14644f(0x2d7)][_0x14644f(0x38e)]||0x0;_0x358350-=Math[_0x14644f(0x59d)](0x0,_0x50a927)*_0x8e8a17*_0x4b0c80;}}}}return _0x358350;},Game_Event['prototype'][_0x4cad34(0x255)]=function(){const _0x1b93b4=_0x4cad34;switch(this[_0x1b93b4(0x174)]()){case _0x1b93b4(0x549):this[_0x1b93b4(0x167)]();break;case _0x1b93b4(0x12f):this[_0x1b93b4(0x48b)]();break;case _0x1b93b4(0x2c7):this[_0x1b93b4(0x3ab)]();break;case _0x1b93b4(0x3e7):this['processMoveSynchCustom']();break;case'mimic':case _0x1b93b4(0x399):this['processMoveSynchMimic']();break;case _0x1b93b4(0x435):case _0x1b93b4(0x219):this['processMoveSynchReverseMimic']();break;case _0x1b93b4(0x203):case'horizontal\x20mirror':case _0x1b93b4(0x1a7):case _0x1b93b4(0x122):this[_0x1b93b4(0x502)]();break;case _0x1b93b4(0x2d0):case'vertical\x20mirror':case _0x1b93b4(0x3ea):case _0x1b93b4(0x365):this[_0x1b93b4(0x385)]();break;default:this['processMoveSynchRandom']();break;}this['update']();},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x167)]=function(){const _0x4381e1=_0x4cad34,_0x557aaf=[0x2,0x4,0x6,0x8];$gameMap[_0x4381e1(0x149)]()&&_0x557aaf[_0x4381e1(0x3c4)](0x1,0x3,0x7,0x9);const _0x860ae6=[];for(const _0x94d218 of _0x557aaf){if(this[_0x4381e1(0x3d5)](this['x'],this['y'],_0x94d218))_0x860ae6[_0x4381e1(0x3c4)](_0x94d218);}if(_0x860ae6[_0x4381e1(0x207)]>0x0){const _0x3f992a=_0x860ae6[Math[_0x4381e1(0x4fe)](_0x860ae6[_0x4381e1(0x207)])];this[_0x4381e1(0x1be)](_0x3f992a);}},Game_Event[_0x4cad34(0x3a4)]['processMoveSynchApproach']=function(){const _0x3f7e5b=_0x4cad34,_0x455461=VisuMZ[_0x3f7e5b(0x33a)](this[_0x3f7e5b(0x349)]());this['moveTowardCharacter'](_0x455461);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x3ab)]=function(){const _0x30a5dd=_0x4cad34,_0x2192ca=VisuMZ[_0x30a5dd(0x33a)](this['moveSynchTarget']());this[_0x30a5dd(0x461)](_0x2192ca);},Game_Event[_0x4cad34(0x3a4)]['processMoveSynchCustom']=function(){const _0x37c65f=_0x4cad34;this[_0x37c65f(0x169)]();},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x1cb)]=function(){const _0x420d4b=_0x4cad34,_0x10e46d=VisuMZ['GetMoveSynchTarget'](this[_0x420d4b(0x349)]());this[_0x420d4b(0x1be)](_0x10e46d['lastMovedDirection']());},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x4f9)]=function(){const _0xf2595e=_0x4cad34,_0x19883e=VisuMZ[_0xf2595e(0x33a)](this[_0xf2595e(0x349)]());this['executeMoveDir8'](this[_0xf2595e(0x30e)](_0x19883e['lastMovedDirection']()));},Game_Event['prototype'][_0x4cad34(0x502)]=function(){const _0x1e2226=_0x4cad34,_0x54d2e0=VisuMZ[_0x1e2226(0x33a)](this['moveSynchTarget']()),_0x21c12d=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x54d2e0[_0x1e2226(0x2b7)]()];this[_0x1e2226(0x1be)](_0x21c12d);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x385)]=function(){const _0x28ca62=_0x4cad34,_0x54baac=VisuMZ[_0x28ca62(0x33a)](this['moveSynchTarget']()),_0x31ef00=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x54baac[_0x28ca62(0x2b7)]()];this[_0x28ca62(0x1be)](_0x31ef00);},Game_Event[_0x4cad34(0x3a4)]['restoreSavedEventPosition']=function(){const _0x1e3a18=_0x4cad34,_0x56ba8e=$gameSystem[_0x1e3a18(0x279)](this);if(!_0x56ba8e)return;this[_0x1e3a18(0x2cd)](_0x56ba8e['x'],_0x56ba8e['y']),this[_0x1e3a18(0x376)](_0x56ba8e[_0x1e3a18(0x2a1)]),this[_0x1e3a18(0x5f5)]===_0x56ba8e[_0x1e3a18(0x5c5)]&&(this['_moveRouteIndex']=_0x56ba8e[_0x1e3a18(0x24f)]);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x49d)]=function(){const _0x58f96b=_0x4cad34;Game_Character[_0x58f96b(0x3a4)][_0x58f96b(0x49d)][_0x58f96b(0x24b)](this),this[_0x58f96b(0x361)]();},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x53b)]=function(){const _0x16165d=_0x4cad34;if($gameMap[_0x16165d(0x124)]())return!![];return this['_saveEventLocation'];},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x361)]=function(){const _0x2e2d5b=_0x4cad34;if(!this[_0x2e2d5b(0x53b)]())return;this['saveEventLocation']();},Game_Event['prototype'][_0x4cad34(0x51b)]=function(){const _0x2159be=_0x4cad34;$gameSystem[_0x2159be(0x51b)](this);},Game_Event['prototype']['deleteEventLocation']=function(){$gameSystem['deleteSavedEventLocation'](this);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x257)]=function(){const _0x430033=_0x4cad34;if($gameSystem[_0x430033(0x257)](this))return Game_Character['prototype'][_0x430033(0x257)][_0x430033(0x24b)](this);else{if(_0x430033(0x355)!==_0x430033(0x404))return{'iconIndex':0x0,'bufferX':settings['Icon'][_0x430033(0x147)],'bufferY':settings[_0x430033(0x260)][_0x430033(0x55e)],'blendMode':settings[_0x430033(0x260)][_0x430033(0x395)]};else delete this['_EventIcons']['Player'];}},Game_Event[_0x4cad34(0x3a4)]['hasCPCs']=function(){const _0x5839f2=_0x4cad34;return this[_0x5839f2(0x452)];},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x547)]=Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x4f2)],Game_Event[_0x4cad34(0x3a4)]['meetsConditions']=function(_0x559a1d){const _0x196657=_0x4cad34,_0x554c47=VisuMZ[_0x196657(0x5b2)][_0x196657(0x547)][_0x196657(0x24b)](this,_0x559a1d);if(!_0x554c47)return![];return this[_0x196657(0x5b8)](_0x559a1d);},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x5b8)]=function(_0x152e78){const _0x51a836=_0x4cad34;VisuMZ[_0x51a836(0x5b2)][_0x51a836(0x238)]['loadCPC'](_0x152e78),this['_CPCs']=_0x152e78[_0x51a836(0x5fe)]['length']>0x0;if(_0x152e78[_0x51a836(0x5fe)]===undefined){if(_0x51a836(0x49e)!=='mvdPL'){const _0x44529e=this['firstSpawnedEvent']();return _0x44529e?_0x44529e[_0x51a836(0x1a9)]:0x0;}else VisuMZ[_0x51a836(0x5b2)]['CustomPageConditions'][_0x51a836(0x46a)](_0x152e78);}if(_0x152e78[_0x51a836(0x5fe)][_0x51a836(0x207)]>0x0)return _0x51a836(0x1eb)!==_0x51a836(0x1eb)?this[_0x51a836(0x2ed)](0x8,_0x341fdd(_0x59e02c['$1'])):$gameMap[_0x51a836(0x199)](this[_0x51a836(0x1a9)])&&VisuMZ['EventsMoveCore'][_0x51a836(0x238)][_0x51a836(0x1ae)](_0x152e78[_0x51a836(0x5fe)],this[_0x51a836(0x1a9)]);return!![];},VisuMZ[_0x4cad34(0x5b2)]['Game_Troop_meetsConditionsCPC']=Game_Troop['prototype'][_0x4cad34(0x4f2)],Game_Troop[_0x4cad34(0x3a4)][_0x4cad34(0x4f2)]=function(_0x333d4c){const _0x5edd0e=_0x4cad34;var _0x22a984=VisuMZ[_0x5edd0e(0x5b2)][_0x5edd0e(0x237)]['call'](this,_0x333d4c);return _0x22a984&&this[_0x5edd0e(0x535)](_0x333d4c);},Game_Troop[_0x4cad34(0x3a4)]['CPCsMet']=function(_0xba3d9a){const _0x2d4e83=_0x4cad34;_0xba3d9a[_0x2d4e83(0x5fe)]===undefined&&('YMZOf'!=='aZNXb'?VisuMZ[_0x2d4e83(0x5b2)][_0x2d4e83(0x238)][_0x2d4e83(0x46a)](_0xba3d9a):(_0x42aad3[_0x2d4e83(0x5d9)]=new _0x4b1b51(),_0x4df807['_shadowSprite']['_filename']=_0x355ab3[_0x2d4e83(0x501)][_0x2d4e83(0x1d3)](),_0x18109c[_0x2d4e83(0x5d9)][_0x2d4e83(0x572)]=_0x2de4a1[_0x2d4e83(0x3d8)](_0x279cbe[_0x2d4e83(0x5d9)][_0x2d4e83(0x310)]),_0x4730f8[_0x2d4e83(0x5d9)][_0x2d4e83(0x216)]['x']=0.5,_0x4a4e8d[_0x2d4e83(0x5d9)][_0x2d4e83(0x216)]['y']=0x1,_0x431a06['_shadowSprite']['z']=0x0,this[_0x2d4e83(0x553)][_0x2d4e83(0x31b)](_0x3f9d46['_shadowSprite'])));if(_0xba3d9a[_0x2d4e83(0x5fe)]['length']>0x0){if(_0x2d4e83(0x2c0)!==_0x2d4e83(0x4d6))return VisuMZ['EventsMoveCore'][_0x2d4e83(0x238)][_0x2d4e83(0x1ae)](_0xba3d9a[_0x2d4e83(0x5fe)],0x0);else{if(!this[_0x2d4e83(0x53b)]())return;this[_0x2d4e83(0x51b)]();}}return!![];},VisuMZ[_0x4cad34(0x5b2)]['Game_Event_locate']=Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x2cd)],Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x2cd)]=function(_0x2b7e40,_0x1aebfc){const _0x5b9d94=_0x4cad34;VisuMZ['EventsMoveCore'][_0x5b9d94(0x34c)][_0x5b9d94(0x24b)](this,_0x2b7e40,_0x1aebfc),this[_0x5b9d94(0x3a5)]=_0x2b7e40,this['_randomHomeY']=_0x1aebfc,this[_0x5b9d94(0x361)]();},VisuMZ['EventsMoveCore'][_0x4cad34(0x109)]=Game_Event[_0x4cad34(0x3a4)]['moveTypeRandom'],Game_Event['prototype'][_0x4cad34(0x14c)]=function(){const _0x3eb78b=_0x4cad34,_0x544f51=$gameMap[_0x3eb78b(0x4ee)](this['x'],this['y'],this[_0x3eb78b(0x3a5)],this[_0x3eb78b(0x575)]),_0x8fe0c8=_0x544f51*(this['_randomMoveWeight']||0x0);if(Math[_0x3eb78b(0x549)]()>=_0x8fe0c8)VisuMZ[_0x3eb78b(0x5b2)][_0x3eb78b(0x109)][_0x3eb78b(0x24b)](this);else{if(_0x3eb78b(0x1b0)===_0x3eb78b(0x222)){const _0xc1017e=_0x2a489f[_0x3eb78b(0x5b2)][_0x3eb78b(0x2f1)][_0x3eb78b(0x4ac)],_0x3d9dbf=this[_0x3eb78b(0x501)][_0x3eb78b(0x2a1)]();let _0x508a33=0x0;if([0x1,0x4,0x7][_0x3eb78b(0x165)](_0x3d9dbf))_0x508a33=_0xc1017e[_0x3eb78b(0x116)];if([0x3,0x6,0x9][_0x3eb78b(0x165)](_0x3d9dbf))_0x508a33=_0xc1017e['TiltRight'];[0x2,0x8][_0x3eb78b(0x165)](_0x3d9dbf)&&(_0x508a33=[-_0xc1017e[_0x3eb78b(0x19c)],0x0,_0xc1017e['TiltVert']][this['_character']['pattern']()]);if(this[_0x3eb78b(0x276)])_0x508a33*=-0x1;this[_0x3eb78b(0x3c1)]=_0x508a33;}else this[_0x3eb78b(0x2ab)]();}},Game_Event[_0x4cad34(0x3a4)][_0x4cad34(0x2ab)]=function(){const _0x41116a=_0x4cad34,_0x26b524=this[_0x41116a(0x55b)](this[_0x41116a(0x3a5)]),_0x5a3941=this[_0x41116a(0x26b)](this['_randomHomeY']);if(Math[_0x41116a(0x2f6)](_0x26b524)>Math['abs'](_0x5a3941)){this[_0x41116a(0x554)](_0x26b524>0x0?0x4:0x6);if(!this[_0x41116a(0x37a)]()&&_0x5a3941!==0x0){if('wNxlq'!==_0x41116a(0x25f)){if(!this[_0x41116a(0x4e0)]())return![];else{const _0x3fdad5=_0x34af7b['eventsXyNt'](_0x1dd561,_0x381a72)['filter'](_0x3daf9b=>_0x3daf9b!==this&&_0x3daf9b[_0x41116a(0x4e0)]());return _0x3fdad5['length']>0x0;}}else this[_0x41116a(0x554)](_0x5a3941>0x0?0x8:0x2);}}else{if(_0x5a3941!==0x0){if('pRODj'!==_0x41116a(0x318))this['moveStraight'](_0x5a3941>0x0?0x8:0x2),!this[_0x41116a(0x37a)]()&&_0x26b524!==0x0&&this[_0x41116a(0x554)](_0x26b524>0x0?0x4:0x6);else{_0x589090[_0x41116a(0x54d)](_0x3efbe1,_0x100b1e);const _0x4f7768=_0x4b5c0a[_0x41116a(0x4d7)](),_0x4d8888=_0x59415d[_0x41116a(0xfe)]||_0x2fbdd8['mapId'](),_0x5f4d41=_0x1e71ba[_0x41116a(0x494)]||_0x4f7768[_0x41116a(0x477)]();_0x381820[_0x41116a(0x43e)](_0x4d8888,_0x5f4d41);}}}},Game_CharacterBase[_0x4cad34(0x3a4)]['clearAttachPictureSettings']=function(){const _0x32f8b6=_0x4cad34;this[_0x32f8b6(0x1b2)]={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x561)]=function(){const _0x1355d9=_0x4cad34;if(this['_attachPicture']===undefined)this['clearAttachPictureSettings']();return this[_0x1355d9(0x1b2)];},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x4ad)]=function(){const _0x2a943c=_0x4cad34;return this[_0x2a943c(0x561)]()[_0x2a943c(0x482)]??'';},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x1cc)]=function(){const _0x44a812=_0x4cad34;return this['attachPictureSettings']()[_0x44a812(0x5fd)]??0x0;},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x593)]=function(){const _0xa2f68d=_0x4cad34;return this[_0xa2f68d(0x561)]()[_0xa2f68d(0x5a4)]??0x0;},Game_CharacterBase[_0x4cad34(0x3a4)][_0x4cad34(0x315)]=function(){const _0x25615d=_0x4cad34;return this['attachPictureSettings']()[_0x25615d(0x27f)]??0x0;},Game_CharacterBase[_0x4cad34(0x3a4)]['attachPictureOffsetY']=function(){const _0x2219c6=_0x4cad34;return this['attachPictureSettings']()[_0x2219c6(0x31e)]??0x0;},Game_CharacterBase[_0x4cad34(0x3a4)]['attachPictureScale']=function(){const _0x44c50e=_0x4cad34;return this['attachPictureSettings']()[_0x44c50e(0x26f)]??0x1;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x43d)]=Game_Interpreter[_0x4cad34(0x3a4)][_0x4cad34(0x57c)],Game_Interpreter['prototype'][_0x4cad34(0x57c)]=function(){const _0xb0e926=_0x4cad34;if(this['_waitMode']==='CallEvent'){if(window[this[_0xb0e926(0x4a1)]])this[_0xb0e926(0x2f0)]='',this[_0xb0e926(0x18b)]();else return!![];}else return VisuMZ[_0xb0e926(0x5b2)]['Game_Interpreter_updateWaitMode'][_0xb0e926(0x24b)](this);},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x148)]=Game_Interpreter[_0x4cad34(0x3a4)][_0x4cad34(0x21f)],Game_Interpreter[_0x4cad34(0x3a4)][_0x4cad34(0x21f)]=function(){const _0x5b331b=_0x4cad34,_0xb5d6c6=$gameMap&&this[_0x5b331b(0x1a9)]?$gameMap[_0x5b331b(0x199)](this[_0x5b331b(0x1a9)]):null;$gameTemp[_0x5b331b(0x280)](_0xb5d6c6);const _0x2c64b9=VisuMZ[_0x5b331b(0x5b2)][_0x5b331b(0x148)][_0x5b331b(0x24b)](this);return $gameTemp[_0x5b331b(0xed)](),_0x2c64b9;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x431)]=Game_Interpreter[_0x4cad34(0x3a4)]['command357'],Game_Interpreter[_0x4cad34(0x3a4)]['command357']=function(_0x4ebc19){const _0x468886=_0x4cad34;return $gameTemp[_0x468886(0x443)](this),VisuMZ[_0x468886(0x5b2)][_0x468886(0x431)][_0x468886(0x24b)](this,_0x4ebc19);},Game_Interpreter['prototype'][_0x4cad34(0x40a)]=function(_0x2301af){const _0x24d34c=_0x4cad34;this[_0x24d34c(0x150)]=_0x2301af;const _0x20aba4=_0x24d34c(0x521)['format'](_0x2301af[_0x24d34c(0x574)]['padZero'](0x3));this[_0x24d34c(0x4a1)]='$callEventMap'+Graphics[_0x24d34c(0x341)]+'_'+this['eventId'](),DataManager[_0x24d34c(0x30a)](this[_0x24d34c(0x4a1)],_0x20aba4);if(window[this[_0x24d34c(0x4a1)]]){if(_0x24d34c(0x589)===_0x24d34c(0x3f8)){const _0x4bd159=_0x445232(_0x62301a['$1'])[_0x24d34c(0x5ca)]()[_0x24d34c(0x2c6)](),_0x5c4e77=['NORMAL',_0x24d34c(0x446),'MULTIPLY','SCREEN'];this[_0x24d34c(0x3c3)][_0x24d34c(0x5fd)]=_0x5c4e77[_0x24d34c(0x1c6)](_0x4bd159)[_0x24d34c(0x229)](0x0,0x3);}else this[_0x24d34c(0x18b)]();}else _0x24d34c(0x1b1)!==_0x24d34c(0x1b1)?_0x30ca72=!![]:this[_0x24d34c(0x4c1)](_0x24d34c(0x569));},Game_Interpreter[_0x4cad34(0x3a4)][_0x4cad34(0x18b)]=function(){const _0x5e0613=_0x4cad34,_0x3feec5=this[_0x5e0613(0x150)],_0x3fa9df=window[this[_0x5e0613(0x4a1)]],_0x690638=_0x3fa9df[_0x5e0613(0x303)][_0x3feec5[_0x5e0613(0x477)]];if(_0x690638&&_0x690638[_0x5e0613(0x35e)][_0x3feec5[_0x5e0613(0x186)]-0x1]){if(_0x5e0613(0x141)===_0x5e0613(0x141)){const _0x5b4193=_0x690638['pages'][_0x3feec5[_0x5e0613(0x186)]-0x1][_0x5e0613(0x1bc)];this[_0x5e0613(0x344)](_0x5b4193,this[_0x5e0613(0x477)]());}else{_0x172c36[_0x5e0613(0x54d)](_0x26484d,_0x1f9019);const _0x48a5df=_0x541345[_0x5e0613(0x1d4)];_0x5dd855[_0x5e0613(0x36a)](_0x48a5df);}}window[this[_0x5e0613(0x4a1)]]=undefined,this[_0x5e0613(0x4a1)]=undefined,this[_0x5e0613(0x150)]=undefined;};function Game_CPCInterpreter(){const _0x5b100c=_0x4cad34;this[_0x5b100c(0x532)][_0x5b100c(0x152)](this,arguments);}function _0x1143(_0x6d012a,_0x4c559b){const _0xf7786d=_0xf778();return _0x1143=function(_0x1143e0,_0x5ab9e6){_0x1143e0=_0x1143e0-0xed;let _0x1812ef=_0xf7786d[_0x1143e0];return _0x1812ef;},_0x1143(_0x6d012a,_0x4c559b);};Game_CPCInterpreter[_0x4cad34(0x3a4)]=Object[_0x4cad34(0x426)](Game_Interpreter[_0x4cad34(0x3a4)]),Game_CPCInterpreter[_0x4cad34(0x3a4)][_0x4cad34(0x35d)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x4cad34(0x3a4)][_0x4cad34(0x133)]=function(){const _0x450181=_0x4cad34;Game_Interpreter['prototype'][_0x450181(0x133)][_0x450181(0x24b)](this),this[_0x450181(0x5e9)]=![];},Game_CPCInterpreter[_0x4cad34(0x3a4)]['execute']=function(){const _0x5e6378=_0x4cad34;while(this[_0x5e6378(0x47a)]()){this[_0x5e6378(0x21f)]();}},Game_CPCInterpreter[_0x4cad34(0x3a4)][_0x4cad34(0x162)]=function(_0x312920){const _0x38785b=_0x4cad34;return Game_Interpreter[_0x38785b(0x3a4)][_0x38785b(0x162)][_0x38785b(0x24b)](this,_0x312920),this[_0x38785b(0x54b)][_0x38785b(0x3b9)](_0x5ac608=>_0x5ac608['match'](/<(?:CONDITION|CONDITIONS) MET>/i))&&(_0x38785b(0x383)!==_0x38785b(0x168)?this[_0x38785b(0x5e9)]=!![]:_0x2d36b2=_0x30b3bb[_0x38785b(0x59d)](_0x489291,_0x119cab)),!![];},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x173)]=Scene_Map[_0x4cad34(0x3a4)][_0x4cad34(0x160)],Scene_Map[_0x4cad34(0x3a4)]['startEncounterEffect']=function(){const _0x5a5cee=_0x4cad34;VisuMZ[_0x5a5cee(0x5b2)][_0x5a5cee(0x173)]['call'](this),this['_spriteset']['hideShadows']();},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x3db)]=Scene_Load['prototype'][_0x4cad34(0x46b)],Scene_Load[_0x4cad34(0x3a4)][_0x4cad34(0x46b)]=function(){const _0x2cdb5a=_0x4cad34;if($gameMap)$gameMap[_0x2cdb5a(0x107)]();VisuMZ[_0x2cdb5a(0x5b2)]['Scene_Load_onLoadSuccess'][_0x2cdb5a(0x24b)](this);},VisuMZ[_0x4cad34(0x5b2)]['Sprite_Character_initMembers']=Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x57f)],Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x57f)]=function(){const _0x10ae9d=_0x4cad34;VisuMZ['EventsMoveCore']['Sprite_Character_initMembers']['call'](this),this['initMembersEventsMoveCore'](),this['createAttachPictureSprite'](),this[_0x10ae9d(0x378)]();},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x306)]=function(){this['_shadowOpacity']=0xff;},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x368)]=function(){const _0x977ff8=_0x4cad34;this[_0x977ff8(0x5b1)]=new Sprite(),this[_0x977ff8(0x5b1)][_0x977ff8(0x216)]['x']=0.5,this[_0x977ff8(0x5b1)][_0x977ff8(0x216)]['y']=0x1,this[_0x977ff8(0x31b)](this['_attachPictureSprite']),this[_0x977ff8(0x1c4)]();},Sprite_Character['prototype'][_0x4cad34(0x378)]=function(){const _0x386979=_0x4cad34;this[_0x386979(0x1fa)]=new Sprite(),this[_0x386979(0x1fa)][_0x386979(0x572)]=ImageManager[_0x386979(0x3d8)](_0x386979(0x21c)),this[_0x386979(0x1fa)]['bitmap'][_0x386979(0x2cf)]=![],this['_eventIconSprite'][_0x386979(0x552)](0x0,0x0,0x0,0x0),this[_0x386979(0x1fa)]['anchor']['x']=0.5,this[_0x386979(0x1fa)][_0x386979(0x216)]['y']=0x1,this[_0x386979(0x31b)](this[_0x386979(0x1fa)]);},Sprite_Character['prototype'][_0x4cad34(0x558)]=function(){const _0x526332=_0x4cad34;return this['_characterName']&&this[_0x526332(0x5de)][_0x526332(0x12a)](/\[VS8\]/i);},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x3ad)]=function(){const _0x4efb22=_0x4cad34;return this[_0x4efb22(0x558)]()&&VisuMZ[_0x4efb22(0x5b2)][_0x4efb22(0x2f1)][_0x4efb22(0x555)]['AutoBuffer'];},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x37f)]=Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x3ee)],Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x3ee)]=function(){const _0x116481=_0x4cad34;VisuMZ['EventsMoveCore']['Sprite_Character_update'][_0x116481(0x24b)](this),this['updateEventsAndMovementCore']();},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x118)]=function(){const _0x1849cd=_0x4cad34;Sprite[_0x1849cd(0x3a4)][_0x1849cd(0x118)][_0x1849cd(0x24b)](this),this['isEventsMoveCoreInvisible']()&&(this[_0x1849cd(0x3b1)]=![]);},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x5da)]=function(){const _0x4090d8=_0x4cad34;if(this['getEventIconIndex']()>0x0)return![];if(this[_0x4090d8(0x501)]){if(this[_0x4090d8(0x501)][_0x4090d8(0x4ad)]()!=='')return![];}return this[_0x4090d8(0x4e8)]()||this[_0x4090d8(0x501)]&&this[_0x4090d8(0x501)][_0x4090d8(0x1ac)]();},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x4c8)]=function(){const _0x160166=_0x4cad34;this[_0x160166(0x251)](),this[_0x160166(0x5fc)](),this['updateEventIconSprite'](),this[_0x160166(0x367)](),this['updateEventMirrorSprite'](),this[_0x160166(0x1c4)]();},VisuMZ[_0x4cad34(0x5b2)]['Sprite_Character_setTileBitmap']=Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x3ef)],Sprite_Character[_0x4cad34(0x3a4)]['setTileBitmap']=function(){const _0x36f62b=_0x4cad34;VisuMZ[_0x36f62b(0x5b2)][_0x36f62b(0x206)]['call'](this),this[_0x36f62b(0x572)][_0x36f62b(0x21a)](this[_0x36f62b(0x38a)][_0x36f62b(0x2a8)](this));},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x3cc)]=Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x55c)],Sprite_Character[_0x4cad34(0x3a4)]['setCharacterBitmap']=function(){const _0x658d81=_0x4cad34;VisuMZ['EventsMoveCore'][_0x658d81(0x3cc)][_0x658d81(0x24b)](this),this['bitmap'][_0x658d81(0x21a)](this[_0x658d81(0x38a)][_0x658d81(0x2a8)](this));},Sprite_Character[_0x4cad34(0x3a4)]['updateBitmapSmoothing']=function(){const _0x1d4e1d=_0x4cad34;if(!this[_0x1d4e1d(0x572)])return;this[_0x1d4e1d(0x572)][_0x1d4e1d(0x2cf)]=!!VisuMZ['EventsMoveCore']['Settings'][_0x1d4e1d(0x4ac)]['BitmapSmoothing'];},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x29c)]=Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x10b)],Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x10b)]=function(){const _0x1a386e=_0x4cad34;return this[_0x1a386e(0x558)]()?this[_0x1a386e(0x486)]():this['characterPatternYBasic']();},Sprite_Character[_0x4cad34(0x3a4)]['characterPatternYVS8']=function(){const _0x4af351=_0x4cad34,_0x151807=this[_0x4af351(0x501)][_0x4af351(0x2a1)]();let _0x5ab14c=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x4af351(0x501)]['_mirrorSprite']&&(_0x5ab14c=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x5ab14c[_0x151807]-0x2)/0x2;},Sprite_Character[_0x4cad34(0x3a4)]['characterPatternYBasic']=function(){const _0x2e4965=_0x4cad34;let _0x49c79c=this[_0x2e4965(0x501)][_0x2e4965(0x2a1)]();if(this[_0x2e4965(0x501)][_0x2e4965(0x470)]){if(_0x2e4965(0x2a9)!==_0x2e4965(0xf5)){if(_0x49c79c===0x4)_0x49c79c=0x6;else _0x49c79c===0x6&&('KKOLi'===_0x2e4965(0x48e)?_0x49c79c=0x4:_0x4e7b34['morphInto'](_0x57feae['Step2MapId'],_0x238257[_0x2e4965(0x16a)]||_0x46eefe[_0x2e4965(0x477)]()));}else{this[_0x2e4965(0x1cd)]=this[_0x2e4965(0x1cd)]||0x0;if(this[_0x2e4965(0x1cd)]>0x0){this[_0x2e4965(0x1cd)]--;if(this[_0x2e4965(0x1cd)]<=0x0&&this[_0x2e4965(0x537)]!==_0x2e4965(0x227))this['clearPose']();}}}return(_0x49c79c-0x2)/0x2;},Sprite_Character['prototype']['updateTilt']=function(){const _0x4cfb24=_0x4cad34;if(!VisuMZ[_0x4cfb24(0x5b2)][_0x4cfb24(0x2f1)]['Movement']['EnableDashTilt'])return;this['rotation']=0x0;if(this[_0x4cfb24(0x159)]()){const _0x37d497=VisuMZ[_0x4cfb24(0x5b2)]['Settings'][_0x4cfb24(0x4ac)],_0xf3a7df=this['_character'][_0x4cfb24(0x2a1)]();let _0x168910=0x0;if([0x1,0x4,0x7][_0x4cfb24(0x165)](_0xf3a7df))_0x168910=_0x37d497[_0x4cfb24(0x116)];if([0x3,0x6,0x9][_0x4cfb24(0x165)](_0xf3a7df))_0x168910=_0x37d497[_0x4cfb24(0x3c0)];[0x2,0x8][_0x4cfb24(0x165)](_0xf3a7df)&&(_0x168910=[-_0x37d497[_0x4cfb24(0x19c)],0x0,_0x37d497[_0x4cfb24(0x19c)]][this[_0x4cfb24(0x501)][_0x4cfb24(0x1f4)]()]);if(this[_0x4cfb24(0x276)])_0x168910*=-0x1;this[_0x4cfb24(0x3c1)]=_0x168910;}},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x159)]=function(){const _0x5c4e24=_0x4cad34;if(this[_0x5c4e24(0x210)])return![];return this[_0x5c4e24(0x501)][_0x5c4e24(0x17b)]()&&!this[_0x5c4e24(0x501)]['isOnLadder']()&&!this[_0x5c4e24(0x501)][_0x5c4e24(0x3de)]()&&this[_0x5c4e24(0x253)]()===0x0;},Sprite_Character[_0x4cad34(0x3a4)]['updateShadow']=function(){const _0x1803f7=_0x4cad34;if(!this['_shadowSprite'])return;this[_0x1803f7(0x5d9)]['x']=this[_0x1803f7(0x501)][_0x1803f7(0x105)](),this[_0x1803f7(0x5d9)]['y']=this['_character']['shadowY'](),this[_0x1803f7(0x5d9)]['opacity']=this['opacity'],this[_0x1803f7(0x5d9)][_0x1803f7(0x3b1)]=this[_0x1803f7(0x501)]['isShadowVisible'](),this[_0x1803f7(0x5d9)][_0x1803f7(0x177)]=this[_0x1803f7(0x177)];if(!this[_0x1803f7(0x501)][_0x1803f7(0x5f1)]())_0x1803f7(0x261)!==_0x1803f7(0x1ec)?(this['_shadowSprite'][_0x1803f7(0x26f)]['x']=Math[_0x1803f7(0x2e1)](0x1,this[_0x1803f7(0x5d9)][_0x1803f7(0x26f)]['x']+0.1),this[_0x1803f7(0x5d9)][_0x1803f7(0x26f)]['y']=Math['min'](0x1,this['_shadowSprite'][_0x1803f7(0x26f)]['y']+0.1)):this[_0x1803f7(0x353)](_0x5a55ff,_0x113875);else{if('bzKHK'===_0x1803f7(0x36e))this[_0x1803f7(0x5d9)]['scale']['x']=Math[_0x1803f7(0x59d)](0x0,this['_shadowSprite'][_0x1803f7(0x26f)]['x']-0.1),this[_0x1803f7(0x5d9)]['scale']['y']=Math['max'](0x0,this['_shadowSprite'][_0x1803f7(0x26f)]['y']-0.1);else return _0x277e84[_0x1803f7(0x5b2)][_0x1803f7(0x2c2)][_0x1803f7(0x24b)](this);}},Sprite_Character['prototype'][_0x4cad34(0x420)]=function(){const _0x3cc795=_0x4cad34;if(!this[_0x3cc795(0x1fa)])return;const _0x2cd5bf=this['_eventIconSprite'],_0x5bc134=this['getEventIconIndex']();if(_0x5bc134<=0x0)return _0x3cc795(0x32d)===_0x3cc795(0x493)?this['moveTowardPoint'](_0x50594f(_0x44571e['$1']),_0xf8850b(_0x30ac43['$2'])):_0x2cd5bf[_0x3cc795(0x552)](0x0,0x0,0x0,0x0);else{const _0x133a18=ImageManager['iconWidth'],_0x40a7f7=ImageManager['iconHeight'],_0x6794da=_0x5bc134%0x10*_0x133a18,_0xf468c9=Math[_0x3cc795(0x53f)](_0x5bc134/0x10)*_0x40a7f7;_0x2cd5bf['setFrame'](_0x6794da,_0xf468c9,_0x133a18,_0x40a7f7),this[_0x3cc795(0x3b1)]=!![];}const _0x3d000f=this[_0x3cc795(0x501)]['getEventIconData']();this[_0x3cc795(0x3ad)]()?this['autoEventIconBuffer'](_0x2cd5bf):(_0x2cd5bf['x']=_0x3d000f?_0x3d000f[_0x3cc795(0x39f)]:0x0,_0x2cd5bf['y']=_0x3d000f?-this[_0x3cc795(0x30f)]+_0x3d000f[_0x3cc795(0x505)]:0x0),_0x2cd5bf[_0x3cc795(0x5fd)]=_0x3d000f?_0x3d000f[_0x3cc795(0x5fd)]:0x0,this[_0x3cc795(0x340)](_0x2cd5bf),this[_0x3cc795(0x31b)](_0x2cd5bf),_0x2cd5bf['rotation']=-this['rotation'];},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x367)]=function(){const _0x58fd71=_0x4cad34;if(!this[_0x58fd71(0x501)])return;if(this[_0x58fd71(0x501)]['_customZ']===undefined)return;if(this['_character']['_customZ']===![])return;this['z']=this['_character'][_0x58fd71(0x52d)],this['z']<0x0?this[_0x58fd71(0x5d9)]['z']=this['z']-0x1:this['_shadowSprite']['z']=0x0;},Sprite_Character[_0x4cad34(0x3a4)]['updateEventMirrorSprite']=function(){const _0x36a024=_0x4cad34;if(!this[_0x36a024(0x501)])return;let _0x31a712=!!this[_0x36a024(0x501)][_0x36a024(0x470)];this[_0x36a024(0x26f)]['x']=Math['abs'](this[_0x36a024(0x26f)]['x'])*(_0x31a712?-0x1:0x1);},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x25d)]=function(_0x5cd172){const _0x5c4414=_0x4cad34;_0x5cd172['x']=0x0,_0x5cd172['y']=-this[_0x5c4414(0x30f)]+this[_0x5c4414(0x30f)]*0x2/0x5,this[_0x5c4414(0x501)][_0x5c4414(0x1f4)]()!==0x1&&(_0x5c4414(0x432)!==_0x5c4414(0x1aa)?_0x5cd172['y']+=0x1:_0x58030f[_0x518686]['f']<_0x3b9465[_0x5d7f74]['f']&&(_0xf9d259=_0x6ee0ab));},Sprite_Character['prototype'][_0x4cad34(0x253)]=function(){const _0x522225=_0x4cad34;if(!this[_0x522225(0x501)])return 0x0;if(this[_0x522225(0x501)][_0x522225(0x499)])return 0x0;const _0x292b7b=this[_0x522225(0x501)]['getEventIconData']();return _0x292b7b?_0x292b7b[_0x522225(0x12e)]||0x0:0x0;},Sprite_Character['prototype'][_0x4cad34(0x1c4)]=function(){const _0x5654f2=_0x4cad34;if(!this['_attachPictureSprite'])return;if(!this[_0x5654f2(0x501)])return;this['setupAttachPictureBitmap'](),this[_0x5654f2(0x43f)]();},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x29b)]=function(){const _0x4e3117=_0x4cad34;if(!this[_0x4e3117(0x369)]())return;const _0x12843a=this[_0x4e3117(0x501)][_0x4e3117(0x561)]();this[_0x4e3117(0x272)]=_0x12843a[_0x4e3117(0x482)],this['_lastAttachPictureMaxSize']=_0x12843a[_0x4e3117(0x5a4)],this[_0x4e3117(0x27c)]=_0x12843a[_0x4e3117(0x26f)];if(_0x12843a['filename']!==''){const _0x2bfbc0=ImageManager[_0x4e3117(0x3ff)](_0x12843a[_0x4e3117(0x482)]);_0x2bfbc0[_0x4e3117(0x21a)](this[_0x4e3117(0x41c)][_0x4e3117(0x2a8)](this,_0x2bfbc0));}else _0x4e3117(0x585)==='wKREA'?(_0x54e554[_0x4e3117(0x3c4)](_0x29cb86),_0x53595f[_0x4e3117(0x3c4)](_0x32f77c)):this[_0x4e3117(0x5b1)]['bitmap']=new Bitmap(0x1,0x1);},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x43f)]=function(){const _0x25d904=_0x4cad34,_0x2682dd=this[_0x25d904(0x5b1)];_0x2682dd['x']=this[_0x25d904(0x501)][_0x25d904(0x315)](),_0x2682dd['y']=this['_character'][_0x25d904(0x459)](),_0x2682dd[_0x25d904(0x5fd)]=this[_0x25d904(0x501)]['attachPictureBlendMode']();},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x369)]=function(){const _0x32b833=_0x4cad34,_0x100a2b=this[_0x32b833(0x501)][_0x32b833(0x561)]();if(_0x100a2b){if(this[_0x32b833(0x272)]!==_0x100a2b['filename'])return!![];if(this['_lastAttachPictureMaxSize']!==_0x100a2b[_0x32b833(0x5a4)])return!![];if(this[_0x32b833(0x27c)]!==_0x100a2b[_0x32b833(0x26f)])return!![];}return![];},Sprite_Character['prototype'][_0x4cad34(0x41c)]=function(_0x46f445){const _0x7f0a03=_0x4cad34,_0x435ac8=this[_0x7f0a03(0x5b1)];_0x435ac8['bitmap']=_0x46f445;const _0x314127=this[_0x7f0a03(0x501)]['attachPictureSettings'](),_0x250e46=_0x314127[_0x7f0a03(0x5a4)],_0x146703=_0x314127[_0x7f0a03(0x26f)];let _0x4f6c6c=0x1;if(_0x250e46>0x0){if(_0x7f0a03(0x403)===_0x7f0a03(0x403)){let _0x4b37a2=this[_0x7f0a03(0x53d)]()||0x1,_0x126494=this[_0x7f0a03(0x11b)]()||0x1;const _0xb7bd95=Math['max'](0x1,_0x4b37a2,_0x126494);_0x4f6c6c=_0x250e46/_0xb7bd95;}else{this[_0x7f0a03(0x4a0)]=![],this[_0x7f0a03(0x4a8)]=![];if(!_0x31ae05)return;const _0x50e530=_0x38f168[_0x7f0a03(0x423)]||'';if(_0x50e530[_0x7f0a03(0x12a)](/<HIDE FOLLOWERS>/i))this[_0x7f0a03(0x4a0)]=![],this[_0x7f0a03(0x4a8)]=!![];else _0x50e530[_0x7f0a03(0x12a)](/<SHOW FOLLOWERS>/i)&&(this[_0x7f0a03(0x4a0)]=!![],this['_forceHideFollower']=![]);}}_0x4f6c6c*=_0x146703;if(_0x4f6c6c!==0x1){if(_0x7f0a03(0x2bc)!==_0x7f0a03(0x472))this[_0x7f0a03(0x5b1)][_0x7f0a03(0x572)][_0x7f0a03(0x2cf)]=!![];else return this[_0x7f0a03(0x1ad)]||0x0;}_0x435ac8[_0x7f0a03(0x26f)]['x']=_0x4f6c6c,_0x435ac8[_0x7f0a03(0x26f)]['y']=_0x4f6c6c,this[_0x7f0a03(0x3b1)]=!![],this[_0x7f0a03(0x43f)]();},Sprite_Character[_0x4cad34(0x3a4)]['getAttachPictureBitmapWidth']=function(){const _0x3932a6=_0x4cad34,_0x48b64e=this[_0x3932a6(0x5b1)];if(!_0x48b64e)return 0x0;return _0x48b64e[_0x3932a6(0x572)][_0x3932a6(0x578)];},Sprite_Character[_0x4cad34(0x3a4)][_0x4cad34(0x11b)]=function(){const _0x36e878=_0x4cad34,_0x9d8d15=this[_0x36e878(0x5b1)];if(!_0x9d8d15)return 0x0;return _0x9d8d15[_0x36e878(0x572)]['height'];},VisuMZ['EventsMoveCore']['Sprite_Balloon_setup']=Sprite_Balloon[_0x4cad34(0x3a4)][_0x4cad34(0x190)],Sprite_Balloon['prototype'][_0x4cad34(0x190)]=function(_0x266a15,_0xbd521){const _0x3178da=_0x4cad34;VisuMZ[_0x3178da(0x5b2)][_0x3178da(0x2ec)][_0x3178da(0x24b)](this,_0x266a15,_0xbd521);if(VisuMZ[_0x3178da(0x5b2)][_0x3178da(0x2f1)]['VS8'][_0x3178da(0x2d2)]){if('dMqaK'!==_0x3178da(0x33f)){if(_0x465b7e[_0x3178da(0x450)]())return![];return _0x15eca2[_0x3178da(0x5b3)][_0x3178da(0x165)](_0x2dfec3);}else this[_0x3178da(0x5be)]['_character']['setBalloonPose'](_0xbd521,this[_0x3178da(0x54e)]);}},VisuMZ['EventsMoveCore'][_0x4cad34(0x5b9)]=Sprite_Balloon[_0x4cad34(0x3a4)]['updatePosition'],Sprite_Balloon[_0x4cad34(0x3a4)]['updatePosition']=function(){const _0x8e42d3=_0x4cad34;VisuMZ[_0x8e42d3(0x5b2)][_0x8e42d3(0x5b9)]['call'](this),this[_0x8e42d3(0x511)]();},Sprite_Balloon[_0x4cad34(0x3a4)][_0x4cad34(0x511)]=function(){const _0x32c2a1=_0x4cad34;this[_0x32c2a1(0x5be)]['_character'][_0x32c2a1(0x558)]()&&(this['x']+=VisuMZ[_0x32c2a1(0x5b2)]['Settings'][_0x32c2a1(0x555)][_0x32c2a1(0x106)],this['y']+=VisuMZ['EventsMoveCore'][_0x32c2a1(0x2f1)][_0x32c2a1(0x555)][_0x32c2a1(0x412)]);},Sprite_Timer[_0x4cad34(0x3a4)][_0x4cad34(0x128)]=function(){const _0x594e99=_0x4cad34;this[_0x594e99(0x572)]=new Bitmap(Math[_0x594e99(0x1b7)](Graphics[_0x594e99(0x11d)]/0x2),0x30),this['bitmap']['fontFace']=this['fontFace'](),this[_0x594e99(0x572)]['fontSize']=this[_0x594e99(0x56e)](),this[_0x594e99(0x572)]['outlineColor']=ColorManager[_0x594e99(0x520)]();},Sprite_Timer['prototype']['timerText']=function(){const _0x2409a7=_0x4cad34,_0x571155=Math[_0x2409a7(0x53f)](this[_0x2409a7(0x530)]/0x3c/0x3c),_0x4ef279=Math[_0x2409a7(0x53f)](this['_seconds']/0x3c)%0x3c,_0x296ae9=this[_0x2409a7(0x530)]%0x3c;let _0x451dda=_0x4ef279['padZero'](0x2)+':'+_0x296ae9[_0x2409a7(0x475)](0x2);if(_0x571155>0x0)_0x451dda=_0x2409a7(0x11e)['format'](_0x571155,_0x451dda);return _0x451dda;};function Sprite_EventLabel(){const _0x4f2b49=_0x4cad34;this[_0x4f2b49(0x532)](...arguments);}Sprite_EventLabel[_0x4cad34(0x3a4)]=Object[_0x4cad34(0x426)](Sprite['prototype']),Sprite_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x35d)]=Sprite_EventLabel,Sprite_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x532)]=function(_0x57a104){const _0x3744f2=_0x4cad34;this[_0x3744f2(0x4ab)]=_0x57a104,Sprite[_0x3744f2(0x3a4)][_0x3744f2(0x532)][_0x3744f2(0x24b)](this),this[_0x3744f2(0x57f)](),this['createProxyWindow']();},Sprite_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x57f)]=function(){const _0x2234d7=_0x4cad34;this[_0x2234d7(0x216)]['x']=0.5,this[_0x2234d7(0x216)]['y']=0x1;},Sprite_EventLabel['prototype'][_0x4cad34(0x321)]=function(){const _0x95d6d1=_0x4cad34,_0x20bd60=new Rectangle(0x0,0x0,0x1,0x1);this[_0x95d6d1(0x391)]=new Window_Base(_0x20bd60),this['_proxyWindow'][_0x95d6d1(0x394)]=0x0,this[_0x95d6d1(0x166)]=this[_0x95d6d1(0x5bd)]()?0xff:0x0;},Sprite_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x3ee)]=function(){const _0x1c4a2a=_0x4cad34;Sprite[_0x1c4a2a(0x3a4)][_0x1c4a2a(0x3ee)][_0x1c4a2a(0x24b)](this),this[_0x1c4a2a(0x1a4)](),this['updateScale'](),this[_0x1c4a2a(0x37b)](),this[_0x1c4a2a(0x4bd)]();},Sprite_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x1a4)]=function(){const _0x4388f0=_0x4cad34;if(this[_0x4388f0(0x4ab)]['labelWindowText']()!==this[_0x4388f0(0x1f3)]){if(_0x4388f0(0x40e)===_0x4388f0(0x40e))this['_text']=this[_0x4388f0(0x4ab)]['labelWindowText'](),this[_0x4388f0(0x4d9)]();else{const _0x3b3e95=_0x3b2875(_0x2cb676['$1'])[_0x4388f0(0x5ca)]()[_0x4388f0(0x2c6)]();return this[_0x4388f0(0x108)](_0x3b3e95);}}},Sprite_EventLabel['prototype'][_0x4cad34(0x4d9)]=function(){const _0x256301=_0x4cad34;if(!this[_0x256301(0x391)])return;this[_0x256301(0x51e)](),this[_0x256301(0x11c)]();},Sprite_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x51e)]=function(){const _0x1ea554=_0x4cad34,_0x2cb436=this[_0x1ea554(0x391)][_0x1ea554(0x4fa)](this[_0x1ea554(0x1f3)]),_0x903296=this[_0x1ea554(0x391)][_0x1ea554(0x2a5)](),_0x5cb465=_0x2cb436['width']+_0x903296*0x2,_0x392a1f=_0x2cb436['height'];this['_proxyWindow'][_0x1ea554(0x414)](0x0,0x0,_0x5cb465,_0x392a1f),this['_proxyWindow'][_0x1ea554(0x20d)](),this[_0x1ea554(0x572)]=this[_0x1ea554(0x391)][_0x1ea554(0x226)];},Sprite_EventLabel['prototype'][_0x4cad34(0x11c)]=function(){const _0x5d6910=_0x4cad34,_0x2a1075=this[_0x5d6910(0x391)][_0x5d6910(0x2a5)]();this[_0x5d6910(0x391)][_0x5d6910(0x4f7)](this[_0x5d6910(0x1f3)],_0x2a1075,0x0);},Sprite_EventLabel['prototype']['updateScale']=function(){const _0x29112e=_0x4cad34,_0x5764a0=VisuMZ[_0x29112e(0x5b2)][_0x29112e(0x2f1)][_0x29112e(0x28f)][_0x29112e(0x1ef)],_0x1b2a07=$gameSystem[_0x29112e(0x43a)]()||0x1;this[_0x29112e(0x26f)]['x']=this[_0x29112e(0x26f)]['y']=_0x5764a0/_0x1b2a07;},Sprite_EventLabel[_0x4cad34(0x3a4)]['updatePosition']=function(){const _0x181484=_0x4cad34;if(!SceneManager[_0x181484(0x568)])return;if(!SceneManager[_0x181484(0x568)][_0x181484(0x1b5)])return;const _0x5e5a1c=SceneManager[_0x181484(0x568)][_0x181484(0x1b5)]['findTargetSprite'](this[_0x181484(0x4ab)]);if(!_0x5e5a1c)return;this['x']=this['_event']['screenX'](),this['x']+=this['_event'][_0x181484(0x2d9)][_0x181484(0x27f)],this['y']=this[_0x181484(0x4ab)][_0x181484(0x5c4)]()-_0x5e5a1c[_0x181484(0x30f)],this['y']+=$gameSystem[_0x181484(0x44e)]()*-0.5,this['y']+=this[_0x181484(0x4ab)]['_labelWindow']['offsetY'];},Sprite_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x4bd)]=function(){const _0x470e2d=_0x4cad34;if(this[_0x470e2d(0x5bd)]())this[_0x470e2d(0x166)]+=this[_0x470e2d(0x586)]();else{if(SceneManager[_0x470e2d(0x568)][_0x470e2d(0x2a2)]>0x0)this['opacity']=0x0;else{if(_0x470e2d(0x1e9)==='iQfTW')return[0x1,0x3,0x5,0x7,0x9]['includes'](_0x2ad178);else this['opacity']-=this[_0x470e2d(0x586)]();}}},Sprite_EventLabel[_0x4cad34(0x3a4)]['isLabelVisible']=function(){const _0x3d66a9=_0x4cad34;if(!$gameSystem[_0x3d66a9(0x3f3)]())return![];if(this['_event']?.[_0x3d66a9(0x499)])return![];if(SceneManager[_0x3d66a9(0x568)][_0x3d66a9(0x2a2)]>0x0)return![];const _0x1c7e4f=$gamePlayer['x'],_0x5e03ea=$gamePlayer['y'],_0x322fce=this[_0x3d66a9(0x4ab)]['x'],_0x36092d=this['_event']['y'];if(this[_0x3d66a9(0x28e)]===_0x1c7e4f&&this[_0x3d66a9(0x38d)]===_0x5e03ea&&this[_0x3d66a9(0x5e7)]===_0x322fce&&this[_0x3d66a9(0x4d3)]===_0x36092d)return this[_0x3d66a9(0x138)];this[_0x3d66a9(0x28e)]=$gamePlayer['x'],this[_0x3d66a9(0x38d)]=$gamePlayer['y'],this[_0x3d66a9(0x5e7)]=this[_0x3d66a9(0x4ab)]['x'],this[_0x3d66a9(0x4d3)]=this[_0x3d66a9(0x4ab)]['y'];if($gameMap['absDistance'](_0x1c7e4f,_0x5e03ea,_0x322fce,_0x36092d)>this['_event']['labelWindowRange']())return this['_cacheVisibility']=![],![];return this[_0x3d66a9(0x138)]=!![],!![];},Sprite_EventLabel['prototype'][_0x4cad34(0x586)]=function(){const _0xebaba=_0x4cad34;return VisuMZ[_0xebaba(0x5b2)]['Settings'][_0xebaba(0x28f)][_0xebaba(0x3bd)];},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x47e)]=Spriteset_Map['prototype'][_0x4cad34(0x401)],Spriteset_Map[_0x4cad34(0x3a4)][_0x4cad34(0x401)]=function(){const _0x113db7=_0x4cad34;VisuMZ['EventsMoveCore'][_0x113db7(0x47e)][_0x113db7(0x24b)](this),this[_0x113db7(0x2d8)]();},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x528)]=Spriteset_Map['prototype'][_0x4cad34(0x50a)],Spriteset_Map[_0x4cad34(0x3a4)][_0x4cad34(0x50a)]=function(){const _0x355c44=_0x4cad34;VisuMZ[_0x355c44(0x5b2)][_0x355c44(0x528)]['call'](this),this[_0x355c44(0x345)]();},Spriteset_Map['prototype'][_0x4cad34(0x345)]=function(){const _0xc192b=_0x4cad34;if(!VisuMZ[_0xc192b(0x5b2)]['Settings'][_0xc192b(0x4ac)][_0xc192b(0x46f)])return;for(const _0x51a636 of this[_0xc192b(0x24a)]){'IJRQA'==='IJRQA'?this[_0xc192b(0x4b7)](_0x51a636):(this[_0xc192b(0x3c3)][_0xc192b(0x39f)]=_0x42e341(_0x47ee1a['$1']),this[_0xc192b(0x3c3)][_0xc192b(0x505)]=_0x21a317(_0x43f182['$2']));}},Spriteset_Map['prototype'][_0x4cad34(0x4b7)]=function(_0x72f708){const _0x552267=_0x4cad34;_0x72f708[_0x552267(0x5d9)]=new Sprite(),_0x72f708[_0x552267(0x5d9)][_0x552267(0x310)]=_0x72f708[_0x552267(0x501)][_0x552267(0x1d3)](),_0x72f708[_0x552267(0x5d9)][_0x552267(0x572)]=ImageManager[_0x552267(0x3d8)](_0x72f708[_0x552267(0x5d9)]['_filename']),_0x72f708[_0x552267(0x5d9)][_0x552267(0x216)]['x']=0.5,_0x72f708[_0x552267(0x5d9)][_0x552267(0x216)]['y']=0x1,_0x72f708[_0x552267(0x5d9)]['z']=0x0,this[_0x552267(0x553)]['addChild'](_0x72f708['_shadowSprite']);},Spriteset_Map[_0x4cad34(0x3a4)][_0x4cad34(0x4ff)]=function(){const _0x37b39a=_0x4cad34;if(!VisuMZ['EventsMoveCore'][_0x37b39a(0x2f1)][_0x37b39a(0x4ac)][_0x37b39a(0x46f)])return;for(const _0x392e9c of this[_0x37b39a(0x24a)]){if(_0x37b39a(0x513)!==_0x37b39a(0x2ba))this[_0x37b39a(0x553)][_0x37b39a(0x340)](_0x392e9c[_0x37b39a(0x5d9)]);else{const _0x2026d5=_0x267750['GetMoveSynchTarget'](this[_0x37b39a(0x349)]());this[_0x37b39a(0x1be)](_0x2026d5[_0x37b39a(0x2b7)]());}}},Spriteset_Map[_0x4cad34(0x3a4)][_0x4cad34(0x2d8)]=function(){const _0x20bc24=_0x4cad34;this[_0x20bc24(0x182)]=[];for(const _0x2bebf6 of $gameMap[_0x20bc24(0x303)]()){if(_0x20bc24(0x538)===_0x20bc24(0x3d0)){if(_0x2cf6ba[_0x20bc24(0x5c2)]())return![];if(_0x175ee9['isPlayerForceHidden']())return!![];}else this[_0x20bc24(0x527)](_0x2bebf6);}},Spriteset_Map['prototype'][_0x4cad34(0x527)]=function(_0x1f51b1){const _0xdd59f4=_0x4cad34;if(!this[_0xdd59f4(0x3e8)](_0x1f51b1))return;let _0x561f76;const _0x443ac6=VisuMZ[_0xdd59f4(0x5b2)]['Settings']['Label'][_0xdd59f4(0x514)]??!![];_0x561f76=_0x443ac6?new Sprite_EventLabel(_0x1f51b1):new Window_EventLabel(_0x1f51b1),_0x561f76['z']=0x8,_0x561f76[_0xdd59f4(0x296)]=Sprite[_0xdd59f4(0x3c2)]++,this[_0xdd59f4(0x553)]['addChild'](_0x561f76),this['_labelWindows'][_0xdd59f4(0x3c4)](_0x561f76);},Spriteset_Map[_0x4cad34(0x3a4)][_0x4cad34(0x3e8)]=function(_0x5c71fc){const _0x215d8a=_0x4cad34,_0x5b0435=_0x5c71fc[_0x215d8a(0x199)]();if(_0x5b0435[_0x215d8a(0x423)]['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x5b0435[_0x215d8a(0x423)][_0x215d8a(0x12a)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0xb74c92 of _0x5b0435[_0x215d8a(0x35e)]){let _0x762ed0='';for(const _0x12dfd7 of _0xb74c92[_0x215d8a(0x1bc)]){if([0x6c,0x198][_0x215d8a(0x165)](_0x12dfd7[_0x215d8a(0x123)])){if(_0x215d8a(0x3fe)===_0x215d8a(0x3fe))_0x762ed0+=_0x12dfd7[_0x215d8a(0x243)][0x0];else return 0x2;}}if(_0x762ed0[_0x215d8a(0x12a)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x762ed0[_0x215d8a(0x12a)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x4cad34(0x3a4)]['createSpawnedEvent']=function(_0x121a29){const _0x10393f=_0x4cad34;this[_0x10393f(0x24a)]=this[_0x10393f(0x24a)]||[];const _0x1822f6=new Sprite_Character(_0x121a29);this[_0x10393f(0x24a)]['push'](_0x1822f6),this[_0x10393f(0x553)][_0x10393f(0x31b)](_0x1822f6),this[_0x10393f(0x4b7)](_0x1822f6),this[_0x10393f(0x527)](_0x121a29),_0x1822f6[_0x10393f(0x3ee)]();},VisuMZ[_0x4cad34(0x5b2)]['Game_Message_setNumberInput']=Game_Message[_0x4cad34(0x3a4)][_0x4cad34(0x5a7)],Game_Message[_0x4cad34(0x3a4)][_0x4cad34(0x5a7)]=function(_0x395d87,_0x37d45f){const _0x363390=_0x4cad34;this[_0x363390(0x351)]=$gameTemp[_0x363390(0x4e1)](),VisuMZ['EventsMoveCore'][_0x363390(0x42e)][_0x363390(0x24b)](this,_0x395d87,_0x37d45f);},VisuMZ['EventsMoveCore']['Window_NumberInput_start']=Window_NumberInput[_0x4cad34(0x3a4)]['start'],Window_NumberInput[_0x4cad34(0x3a4)]['start']=function(){const _0x63c792=_0x4cad34;$gameTemp[_0x63c792(0x280)]($gameMessage[_0x63c792(0x351)]),VisuMZ['EventsMoveCore'][_0x63c792(0x204)]['call'](this),$gameTemp[_0x63c792(0xed)]();},VisuMZ[_0x4cad34(0x5b2)]['Window_NumberInput_processOk']=Window_NumberInput[_0x4cad34(0x3a4)][_0x4cad34(0x434)],Window_NumberInput[_0x4cad34(0x3a4)][_0x4cad34(0x434)]=function(){const _0x43b7d2=_0x4cad34;$gameTemp[_0x43b7d2(0x280)]($gameMessage['_selfTargetNumberInput']),VisuMZ[_0x43b7d2(0x5b2)][_0x43b7d2(0x492)][_0x43b7d2(0x24b)](this),$gameTemp[_0x43b7d2(0xed)](),$gameMessage[_0x43b7d2(0x351)]=undefined;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x3bb)]=Game_Message[_0x4cad34(0x3a4)][_0x4cad34(0x264)],Game_Message[_0x4cad34(0x3a4)]['setItemChoice']=function(_0x1c16d5,_0x117a1c){const _0x56600d=_0x4cad34;this[_0x56600d(0x2be)]=$gameTemp[_0x56600d(0x4e1)](),VisuMZ[_0x56600d(0x5b2)]['Game_Message_setItemChoice']['call'](this,_0x1c16d5,_0x117a1c);},VisuMZ[_0x4cad34(0x5b2)]['Window_EventItem_onOk']=Window_EventItem[_0x4cad34(0x3a4)][_0x4cad34(0x1bf)],Window_EventItem[_0x4cad34(0x3a4)][_0x4cad34(0x1bf)]=function(){const _0x3ede6c=_0x4cad34;$gameTemp['registerSelfTarget']($gameMessage[_0x3ede6c(0x2be)]),VisuMZ[_0x3ede6c(0x5b2)][_0x3ede6c(0x3dd)][_0x3ede6c(0x24b)](this),$gameTemp[_0x3ede6c(0xed)](),$gameMessage[_0x3ede6c(0x2be)]=undefined;},VisuMZ['EventsMoveCore'][_0x4cad34(0x3b0)]=Window_EventItem['prototype']['onCancel'],Window_EventItem[_0x4cad34(0x3a4)][_0x4cad34(0x163)]=function(){const _0x5e9406=_0x4cad34;$gameTemp[_0x5e9406(0x280)]($gameMessage[_0x5e9406(0x2be)]),VisuMZ[_0x5e9406(0x5b2)][_0x5e9406(0x3b0)]['call'](this),$gameTemp[_0x5e9406(0xed)](),$gameMessage[_0x5e9406(0x2be)]=undefined;},VisuMZ[_0x4cad34(0x5b2)][_0x4cad34(0x290)]=Window_Message[_0x4cad34(0x3a4)][_0x4cad34(0xf8)],Window_Message[_0x4cad34(0x3a4)]['startMessage']=function(){const _0x4e1ee3=_0x4cad34;$gameMessage[_0x4e1ee3(0x58d)](),VisuMZ[_0x4e1ee3(0x5b2)][_0x4e1ee3(0x290)]['call'](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x4cad34(0x5b2)]['Window_ScrollText_startMessage']=Window_ScrollText[_0x4cad34(0x3a4)][_0x4cad34(0xf8)],Window_ScrollText[_0x4cad34(0x3a4)]['startMessage']=function(){const _0x23b9d7=_0x4cad34;$gameMessage[_0x23b9d7(0x58d)](),VisuMZ[_0x23b9d7(0x5b2)][_0x23b9d7(0x220)]['call'](this),$gameTemp[_0x23b9d7(0xed)]();};function Window_EventLabel(){const _0x4fbea0=_0x4cad34;this[_0x4fbea0(0x532)](...arguments);}function _0xf778(){const _0x36179a=['3503766hviylE','Visible','areFollowersForceShown','fontSize','TurnInPlaceDelay','despawnAtXY','convertSelfVariableValuesInScriptCall','bitmap','isAllowEventAutoMovement','mapId','_randomHomeY','selfValue','_realX','width','isTile','OdrgI','setEventIconDataKey','updateWaitMode','_data','lvpVC','initMembers','target','firstSpawnedEvent','initFollowerController','PreSpawnJS','isMapVariable','lXqbo','opacitySpeed','JSON','setDestination','mQvqd','switch1Id','switches','Name','registerSelfEvent','YLQVu','SCREEN','Letter','jhyTt','processMoveRouteFadeOut','attachPictureMaxSize','isCollidedWithPlayerCharacters','StopAutoMoveMessages','fontFace','RKncu','Game_Message_add','getPlayerDiagonalSetting','conditions','bZkcD','OYZMH','max','TQJGG','activationRegionList','LIGHT\x20BULB','pILCY','requestAnimation','_saveEventLocation','maxSize','STRUCT','processMoveRouteHugWall','setNumberInput','YAbQf','setupDiagonalSupport','BULB','_saveEventLocations','khNmr','isDashingEnabled','EventIconDelete','setMapValue','FpnoW','_attachPictureSprite','EventsMoveCore','MapSwitches','...','setEventLabelsVisible','HtzpD','getPosingCharacterPattern','meetsCPC','Sprite_Balloon_updatePosition','Ysnrq','HcJIe','processMoveRouteSelfVariable','isLabelVisible','_target','FastForwardKey','EhWrG','isAnyEventStarting','isPlayerForceShown','isRegionDockable','screenY','pageIndex','stop','RIGHT\x20TO\x20LEFT','Value','despawnEverything','toUpperCase','SLEEP','hasClickTrigger','mLXUX','switch2Id','fexmv','Game_Event_updateSelfMovement','createSpawnedEvent','_trigger','_DisablePlayerControl','_activationProximity','tileHeight','NyAMM','330310PMxhNb','template','_shadowSprite','isEventsMoveCoreInvisible','timer','_opacity','hasDragonbones','_characterName','isShip','setupSpawnedEvents','characterPatternYBasic','changeSpeed','EnableDashTilt','characterName','Game_Switches_setValue','1492289jWhQFU','_visibleEventX','ShipSpeed','_cpc','isPreventSelfMovement','JLYqZ','iHKYV','exit','Game_Event_event','UJAWJ','Self\x20Switch\x20%1','isShadowShrink','Allow','execute','Toggle','_pageIndex','VICTORY','IconSize','Game_Timer_stop','MessageCore','findProperPageIndex','RWrIR','updateShadow','blendMode','CPC','clearSelfTarget','Ohylj','sKpet','Game_Event_initialize','Game_CharacterBase_characterIndex','_type','findDirectionTo','_eventErased','vNhQD','STR','initEventsMoveCore','startMessage','JywaY','checkExistingEntitiesAt','onClickTrigger','qCdJB','registerCommand','MapId','delay','ObDDS','Preserve','EventLabelRefresh','hasStepAnime','WYDWj','shadowX','BalloonOffsetX','clearEventCache','setPose','Game_Event_moveTypeRandom','characterIndex','characterPatternY','row','VariableGetSelfVariableID','JEbfd','isTriggerIn','StrictCollision','Visibility','setPlayerControlDisable','Game_CharacterBase_setDirection','SILENCE','_stopCount','TiltLeft','SPIN\x20COUNTERCLOCKWISE','updateVisibility','isPassableByAnyDirection','FYCmk','getAttachPictureBitmapHeight','drawText','boxWidth','%1:%2','Game_Vehicle_isLandOk','RIGHT','pFARU','horz\x20mirror','code','isSaveEventLocations','process_VisuMZ_EventsMoveCore_Switches_Variables','USER-DEFINED\x203','LIGHT-BULB','createBitmap','processMoveRouteJumpToCharacter','match','clearDestination','checkActivationProximity','isRegionForbidPass','iconIndex','approach','UMMOV','setupEvents','wulKE','clear','ARRAYEVAL','EnableTurnInPlace','startMapCommonEventOnTouch','roundY','_cacheVisibility','MapVariables','_characterIndex','SpawnEventAtRegion','zoomScale','Seconds','Vjpnb','Setting','_selfEvent','QMFTb','_forceCarrying','Game_Map_events','_vehicleType','character','onDatabaseLoaded','BufferX','Game_Interpreter_executeCommand','isSupportDiagonalMovement','QHtZP','Game_Player_isMapPassable','moveTypeRandom','_expireCommonEvent','JcTHU','_paused','_callEventData','_screenZoomScale','apply','ZmuPL','moveByInput','LineHeight','frontY','IconIndex','visibleRange','isAllowCharacterTilt','Game_Event_findProperPageIndex','GwXcC','getPose','CJaOG','startMapCommonEventOnOKTarget','_alwaysUpdateMove','startEncounterEffect','boat','command108','onCancel','PlayerIconDelete','includes','opacity','processMoveSynchRandom','TMZPz','updateRoutineMove','Step2EventId','fIMxR','updatePose','makeDeepCopy','SelfVariables','YskzL','turnTowardPoint','scrolledY','yhXgV','Scene_Map_startEncounterEffect','moveSynchType','Game_Event_updateParallel','Enable','_hidden','_forceShowPlayer','VisuMZ_2_DragonbonesUnion','BoatSpeed','isDashingAndMoving','setupCopyEvent','processMoveRoutePatternLock','kZUnV','HMPH','updateMoveSynch','pfkSN','_labelWindows','prepareSpawnedEventAtRegion','isMapSwitch','advancedFunc','pageId','kPzBN','AXlPz','turn180','down','startCallEvent','removeMorph','MULTIPLY','variableId','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','setup','forceCarrying','replace','ncqBL','mapValue','drawing','Dock','COLLAPSE','_activationProximityAutoTriggerBypass','event','Frames','charAt','TiltVert','canStartLocalEvents','destinationX','595587vzMDul','ZyLak','SuccessSwitchId','_commonEvents','isValid','updateText','Game_CharacterBase_moveStraight','setPlayerDiagonalSetting','mirror\x20horz','uZhdB','_eventId','TuZXB','rKEda','isTransparent','_lastMovedDirection','metCPC','Region%1','ViVrt','pReEU','_attachPicture','hFFcz','SPIN\x20CCW','_spriteset','swTMN','round','PlayerMovementDiagonal','YJemL','updateParallel','Game_Map_unlockEvent','list','UNTITLED','executeMoveDir8','onOk','getPosingCharacterIndex','reserveCommonEvent','ccBeT','Game_CharacterBase_updatePattern','updateAttachPictureSprite','isRegionAllowPass','indexOf','isShadowVisible','dXtYU','_eventSpawnData','Collision','processMoveSynchMimic','attachPictureBlendMode','_poseDuration','FollowerID','determineEventOverload','_eventScreenX','WalkAllow','_SavedEventLocations','shadowFilename','CommonEventID','correctFacingDirection','setMoveRoute','DashModifier','aAdcx','dwqRI','getPosingCharacterDirection','VehicleDock','QsXDd','setupFollowerVisibilityOverrides','initEventsMoveCoreEffects','SwitchId','setStopFollowerChasing','destinationY','enable','isPlaytest','add','setFrames','CjDIB','ynLNx','EventID','lQYGA','_inputTime','HFLUl','fczAN','posNt','DashingEnable','FontSize','Player','Kglhq','_lastPluginCommandInterpreter','_text','pattern','_eventLabelOffsetY','NeJnQ','ARRAYJSON','toLowerCase','isPlayerControlDisabled','_eventIconSprite','HEART','prepareSpawnedEventAtTerrainTag','QyRWU','clearAttachPictureSettings','blt','EventTimerExpireClear','processMoveRouteSelfSwitch','AirshipSpeed','mirror\x20horizontal','Window_NumberInput_start','hasCPCs','Sprite_Character_setTileBitmap','length','_EventIcons','_commonEventId','forceDashing','IGNoq','MapID','createContents','isStopFollowerChasing','_stepPattern','_dragonbones','LOWER\x20LEFT','LOWER\x20RIGHT','setBalloonPose','processMoveRouteJumpTo','resetFontSettings','anchor','deleteIconsOnEventsData','USER-DEFINED\x202','reverse\x20copy','addLoadListener','checkEventsMoveCoreStringTags','IconSet','dir8','initEventsMoveCoreSettings','executeCommand','Window_ScrollText_startMessage','moveDiagonally','derKM','radius','regionList','Xzcfm','contents','ZZZ','PosX','clamp','%1Allow','isTurnInPlace','MorphEventRemove','turnLeft90','Game_Character_forceMoveRoute','inBattle','Step2MapId','deleteSavedEventLocation','MUSIC','AdvancedVariables','_moveAllowPlayerCollision','VisibleEventLabels','_spriteOffsetX','Game_Troop_meetsConditionsCPC','CustomPageConditions','deltaX','lCbHQ','EventAutoMovement','Game_CharacterBase_pattern','_spawnedEvents','updateSelfMovement','VariableId','processMoveRouteMoveTo','DeyBa','switchId','parameters','Game_Variables_value','shadowY','sXDUm','LIGHT','yxUuR','variables','_characterSprites','call','updatePattern','return\x20%1','Game_CharacterBase_screenY','moveRouteIndex','isActive','updateTilt','Game_Map_setup','getEventIconIndex','findTargetSprite','processMoveSynch','%1DockRegionOnly','getEventIconData','COBWEB','isAirship','Iibau','Game_Player_isDashing','SPIN\x20CW','autoEventIconBuffer','%1Dock','wNxlq','Icon','UZMrf','PreloadedMaps','executeMove','setItemChoice','parse','isPressed','OffsetX','TEZbD','remove','isSpawnedEvent','deltaYFrom','TargetSwitchId','_frames','_shadowGraphic','scale','MUSICNOTE','Direction','_lastAttachPictureFilename','isDiagonalDirection','processMoveCommand','gainFrames','_reflection','parallelCommonEvents','turnTowardCharacter','getSavedEventLocation','VNUIc','_followerChaseOff','_lastAttachPictureScale','version','EeJbb','offsetX','registerSelfTarget','OffsetY','HURT','PostMorphJS','YqHEB','_eventMorphData','EventTimerExpireEvent','turnRight90','NDXIK','checkRegionEventTrigger','followers','IxHBB','setMovementSuccess','_spawnPreserved','_visiblePlayerX','Label','Window_Message_startMessage','AzzSG','concat','checkSmartEventCollision','SpawnEventDespawnAtXY','Minutes','spriteId','_PlayerDiagonalSetting','OFF','FavorHorz','clearPose','setupAttachPictureBitmap','Sprite_Character_characterPatternY','setupPageSettings','_eventPageIndex','Game_Timer_onExpire','PosY','direction','_encounterEffectDuration','_spriteOffsetY','Map%1-Event%2','itemPadding','meetActivationProximityConditions','nXwMl','bind','lsdFp','unlockEvent','moveBackToRandomHome','VJqdp','GCtQw','resume','requestBalloon','lineHeight','isAdvancedVariable','isMapPassable','eUhGn','_eventCache','General','_EventsMoveCoreSettings','lastMovedDirection','RRkBR','gxgVH','JpXpL','phMIy','WtKyQ','gLvyI','_selfTargetItemChoice','Game_CharacterBase_update','yXVEs','TerrainTag','Game_CharacterBase_direction','mPrLc','region','yrKfz','trim','away','_mapId','9kXpJzg','Rope','setupSaveEventLocations','log','locate','Game_Map_refresh','smooth','mirror\x20vertical','Step1EventId','AutoBalloon','hasEventIcon','setupPlayerVisibilityOverrides','PlayerIconChange','Game_Player_getInputDirection','_moveSynch','createLabelWindows','_labelWindow','player','_eventScreenY','start','DefaultShadow','iconHeight','XQsGL','UPPER\x20RIGHT','min','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','isEventRunning','isSelfVariable','Game_CharacterBase_increaseSteps','Game_CharacterBase_moveDiagonally','VNxql','wRldF','isSpawnHitboxCollisionOk','_moveOnlyRegions','ISuui','Sprite_Balloon_setup','processMoveRouteMoveRepeat','activationProximityType','searchLimit','_waitMode','Settings','IconBlendMode','setupSpawn','ROUTE_SCRIPT','WzKXm','abs','SelfSwitchID','PreCopyJS','lGfWE','Step1MapId','Game_CharacterBase_realMoveSpeed','Fslrq','USpla','AllForbid','WlYXb','Stop','_moveSpeed','getInputDir8','events','UkFkt','TerrainTags','initMembersEventsMoveCore','_eventLabelOffsetX','contentsOpacity','RegionOk','loadDataFile','increaseSteps','Game_CharacterBase_hasStepAnime','_needsPeriodicRefresh','reverseDir','height','_filename','PlayerForbid','map','eventsXy','updatePeriodicRefresh','attachPictureOffsetX','zVUBu','isDashDisabled','vdjoD','Passability','removeTemporaryMapSpawnedEvents','addChild','page','_working','offsetY','absDistance','VisuMZ_1_MessageCore','createProxyWindow','dACOy','Game_Map_isDashDisabled','_patternLocked','defaultFontSize','%1Forbid','KNEEL','of\x20Preloaded\x20Maps.\x0a\x0a','isDestinationValid','Vehicle','TargetVariableId','_spawnData','XhIoi','33293770SGakkI','_realY','bJPQc','EventLabelVisible','moveAwayFromPoint','Walk','EXCLAMATION','kByml','updateShadowChanges','isNearTheScreen','FALSE','NRxka','GetMoveSynchTarget','GcKpI','%1%2','processMoveRouteBalloon','createSaveEventLocationData','dMqaK','removeChild','frameCount','lastSpawnedEventID','DKYhY','setupChild','createShadows','isObjectCharacter','deletePreservedMorphEventDataKey','36WhIfmJ','moveSynchTarget','sznbS','IconBufferY','Game_Event_locate','Eslyk','Game_SelfSwitches_value','Game_Event_meetsConditions','Game_Character_processMoveCommand','_selfTargetNumberInput','savePreservedMorphEventDataKey','setSelfValue','NIDWM','uiozz','_interpreter','status','tHlNC','airship','olMVf','MoveRouteIndex','updatePatternEventsMoveCore','constructor','pages','Game_Player_executeMove','SlowerSpeed','autosaveEventLocation','default','standing','clearStepPattern','vert\x20mirror','SwitchGetSelfSwitchABCD','updateEventCustomZ','createAttachPictureSprite','needsAttachPictureUpdate','setCommonEvent','OZcAx','SelfSwitchABCD','findDiagonalDirectionTo','bzKHK','Etnsp','Game_CommonEvent_isActive','rWphK','VisuMZ_Setup_Preload_Map','Game_Map_setupEvents','hLpKH','filter','setDirection','Scene_Boot_onDatabaseLoaded','createIconSprite','SelfVariableID','isMovementSucceeded','updatePosition','PlayerMovementChange','_regionRules','isPassable','Sprite_Character_update','morphInto','checkCollisionKeywords','RegionTouch','YUkgq','Game_Switches_value','processMoveSynchMirrorVert','AutoMoveEvents','_diagonalSupport','EventForbid','EventTemplates','updateBitmapSmoothing','checkAdvancedSwitchVariablePresent','FollowerSetTargetChase','_visiblePlayerY','opacityDelta','_clickTrigger','FRUSTRATION','_proxyWindow','ANNOYED','Game_Timer_start','padding','BlendMode','onExpire','qaRYF','initMoveSpeed','copy','forceMoveRoute','Bsldz','roundYWithDirection','string','parent','bufferX','vxWpP','_forceDashing','_eventOverloadThreshold','yjIDA','prototype','_randomHomeX','setDashingEnabled','$preloadedMap_%1','ship','AllAllow','APsEB','processMoveSynchAway','Operation','isAutoBufferIcon','moveTowardPoint','quIDU','Window_EventItem_onCancel','visible','isSelfSwitch','iconWidth','dccgr','WIRoe','Disable','getDirectionToPoint','LKcQA','some','backX','Game_Message_setItemChoice','checkEventTriggerThere','OpacitySpeed','isInVehicle','none','TiltRight','rotation','_counter','_eventIcon','push','_speed','SPIN\x20ANTICLOCKWISE','adjustDir8MovementSpeed','switch2Valid','Game_Interpreter_character','follower','EhFgS','Sprite_Character_setCharacterBitmap','sPVCZ','TvxQk','setMoveSpeed','zbqYD','isVisible','SpawnEventAtTerrainTag','splice','roundXWithDirection','canPass','eraseEvent','WHeGb','loadSystem','spawnEventId','type','Scene_Load_onLoadSuccess','Game_Player_checkEventTriggerHere','Window_EventItem_onOk','isPosing','FollowerReset','setPattern','isJumping','setupEventsMoveCoreEffects','firstSpawnedEventID','MSRzb','setupEventsMoveCoreCommentTags','FUNC','custom','isTargetEventValidForLabelWindow','NPgqI','mirror\x20vert','_pattern','EventIconChange','processMoveRouteSetIndex','update','setTileBitmap','updateEventsMoveCoreTagChanges','ARRAYSTRUCT','morphIntoTemplate','eventLabelsVisible','Template','moZNN','labelWindowText','referEvent','FUFjK','yInJj','characterIndexVS8','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','_addedHitbox','restoreSavedEventPosition','FuKQx','loadPicture','PXYLd','createLowerLayer','deltaY','frXBq','KVBUJ','muTVS','USER-DEFINED\x201','drawIcon','Game_CharacterBase_isTransparent','updateScale','pluginCommandCallEvent','processMoveRouteTeleportToCharacter','jHztk','areFollowersForceHidden','zdWBs','DimZL','switch1Valid','yfrFa','BalloonOffsetY','right','move','EKupS','SPIN\x20ACW','format','DEFAULT_SHIFT_Y','QDGRF','Game_CharacterBase_canPass','roundX','onLoadAttachPicture','Game_Event_setupPageSettings','Region','pYuTH','updateEventIconSprite','_eventOverload','kFNPy','note','left','jump','create','ShiftY','HoZQv','clearPageSettings','_selfTarget','Game_Timer_initialize','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','processMoveRouteTeleportTo','Game_Message_setNumberInput','VisibleRange','2PuheLj','Game_Interpreter_PluginCommand','jXDvk','Game_Player_checkEventTriggerThere','processOk','reverse\x20mimic','Game_Event_clearPageSettings','WalkForbid','zIDyO','processMoveRouteMoveUntilStop','mainFontSize','disable','SWEAT','Game_Interpreter_updateWaitMode','deleteSavedEventLocationKey','updateAttachPictureBitmap','ARRAYNUM','unlock','determineCommonEventsWithCPC','setLastPluginCommandInterpreter','hasAdvancedSwitchVariable','screenX','ADDITIVE','getControlledFollowerID','HNAYz','SPIN\x20CLOCKWISE','iconSize','875430qnIHVe','setOpacity','rBmzZ','windowPadding','QUESTION','isBattleTest','fwUWo','_CPCs','ZUxTg','setDiagonalDirection','PVeAL','eventsXyNt','bcVVQ','despawnRegions','attachPictureOffsetY','isOnRope','setChaseOff','setAllowEventAutoMovement','refreshIfNeeded','fCmoO','VisuMZ_0_CoreEngine','Game_Map_parallelCommonEvents','moveAwayFromCharacter','LOVE','vehicle','IconBufferX','slice','labelWindowRange','LSuST','Game_Troop_meetsConditions','Game_Vehicle_isMapPassable','loadCPC','onLoadSuccess','USER-DEFINED\x205','checkEventTriggerEventsMoveCore','LuGrf','ShowShadows','_mirrorSprite','NtPtA','rlXxm','ARRAYFUNC','JfOIF','padZero','YgWmI','eventId','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','processMoveRouteAnimation','isRunning','isMoveOnlyRegionPassable','isEventTest','MoveAllSynchTargets','Spriteset_Map_createLowerLayer','processMoveRouteJumpForward','isOnLadder','setupRegionRestrictions','filename','EventLocationDelete','getPreservedMorphEventData','_MapSpawnedEventData','characterPatternYVS8','setBackgroundType','EventTimerFramesGain','_moveRouteIndex','RzUpY','processMoveSynchApproach','requestRefresh','pause','KKOLi','EventLocationSave','SelfSwitches','Game_Player_increaseSteps','Window_NumberInput_processOk','xTiGF','EventId','Game_Follower_chaseCharacter','Game_Character_setMoveRoute','setControlledFollowerID','ughVV','_erased','Button','PVzBm','MUSIC\x20NOTE','updateMove','mvdPL','value','_forceShowFollower','_callEventMap','getInputDirection','SpawnEventDespawnRegions','meetsSwitchCondition','kGQud','EIUfl','Nueru','_forceHideFollower','checkEventTriggerHere','description','_event','Movement','attachPictureFilename','Game_CharacterBase_screenX','posEventsMoveCore','text','checkEventTriggerAuto','realMoveSpeed','aBPVO','OperateValues','ARRAYSTR','_cacheSystemVisible','createCharacterShadow','createSpawnedEventWithData','_forceHidePlayer','Map\x20%1\x20Variable\x20%2','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','jxpoE','updateOpacity','isDashing','regionId','isSmartEventCollisionOn','setWaitMode','setupSpawnTest','canPassDiagonally','EventTimerFramesSet','Game_Map_event','Igznk','canMove','updateEventsAndMovementCore','TemplateName','needsUpdate','isAdvancedSwitch','RandomMoveWeight','AdvancedSwitches','terrainTag','DAIIm','isBoat','MesXu','clearCarrying','_visibleEventY','EnableDir8','_advancedSwitchVariable','utVWD','getLastPluginCommandInterpreter','PostCopyJS','refresh','getMapSpawnedEventData','PreloadMaps','_periodicRefreshTimer','fzXja','front','_direction','isNormalPriority','getSelfTarget','UPPER\x20LEFT','ITEM','isWorking','DiagonalSpeedMultiplier','processMoveRouteStepFrom','Map\x20%1\x20Switch\x20%2','isEmptyCharacter','Game_Followers_isVisible','DosHA','dashSpeedModifier','name','EventTimerSpeed','distance','DashEnableToggle','processMoveRouteStepToCharacter','turnAwayFromPoint','meetsConditions','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ZcsQp','Game_Enemy_meetsSwitchCondition','meetActivationRegionConditions','drawTextEx','_moveRoute','processMoveSynchReverseMimic','textSizeEx','hasMoveOnlyRegions','LtDTy','activationProximityDistance','randomInt','hideShadows','Game_Variables_setValue','_character','processMoveSynchMirrorHorz','Self\x20Variable\x20%1','SwitchGetSelfSwitchID','bufferY','adjustMoveSynchOpacityDelta','VehicleAllow','deleteIconsOnEventsDataKey','erase','createShadow','getDirectionFromPoint','Chase','pos','Game_CharacterBase_isDashing','checkNeedForPeriodicRefresh','Game_Event_checkEventTriggerAuto','updateVS8BalloonOffsets','lastSpawnedEvent','GDceF','SpriteBased','MXDPs','EIpDk','wBzmt','_PreservedEventMorphData','clearDashing','setValue','saveEventLocation','Game_CharacterBase_initMembers','Hours','resizeWindow','setupMorphEvent','outlineColor','Map%1.json','processMoveRouteStepTo','MNZpx','despawnEventId','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Step2Preserve','createLabelWindowForTarget','Spriteset_Map_createShadow','isMoving','startMapCommonEventOnOK','convertVariableValuesInScriptCall','backY','_customZ','PageId','turnAwayFromCharacter','_seconds','RemovePreserve','initialize','processMoveRouteMoveToCharacter','LEZkc','CPCsMet','Game_Event_start','_pose','GELhH','variableValid','isEventClickTriggered','isSaveEventLocation','Game_Event_isCollidedWithPlayerCharacters','getAttachPictureBitmapWidth','_followerControlID','floor','yifQJ','DyXvB','MorphEventTo','isPlayerForceHidden','PostSpawnJS','tKrlR','12560192bbvycX','Game_Event_meetsConditionsCPC','goqki','random','setupEventsMoveCoreNotetags','_comments','ANGER','ConvertParams','_duration','spawnPreserved','processMoveCommandEventsMoveCore','checkValidEventerMap','setFrame','_tilemap','moveStraight','VS8','tileWidth','chaseCharacter','isSpriteVS8dir','frontX','clearSpriteOffsets','deltaXFrom','setCharacterBitmap','_eventCopyData','BufferY','nuNxv','Ship','attachPictureSettings','setEventIconData','despawnTerrainTags','isBigCharacter','_chaseOff','zQbyQ','VwfCe','_scene','CallEvent','NORMAL'];_0xf778=function(){return _0x36179a;};return _0xf778();}Window_EventLabel[_0x4cad34(0x3a4)]=Object[_0x4cad34(0x426)](Window_Base['prototype']),Window_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x35d)]=Window_EventLabel,Window_EventLabel[_0x4cad34(0x3a4)]['initialize']=function(_0x45380e){const _0x40c927=_0x4cad34;this['_event']=_0x45380e;const _0x171a0f=new Rectangle(0x0,0x0,Graphics[_0x40c927(0x11d)]/0x4,this['fittingHeight'](0x1));this['initMembers'](),Window_Base[_0x40c927(0x3a4)][_0x40c927(0x532)][_0x40c927(0x24b)](this,_0x171a0f),this[_0x40c927(0x308)]=0x0,this[_0x40c927(0x487)](0x2),this['_text']='';},Window_EventLabel[_0x4cad34(0x3a4)]['initMembers']=function(){const _0x424804=_0x4cad34;this['_eventErased']=![],this['_screenZoomScale']=$gameScreen[_0x424804(0x13c)](),this[_0x424804(0x1d0)]=this['_event']['screenX'](),this[_0x424804(0x2db)]=this[_0x424804(0x4ab)][_0x424804(0x5c4)](),this[_0x424804(0x307)]=this[_0x424804(0x4ab)][_0x424804(0x2d9)][_0x424804(0x27f)],this[_0x424804(0x1f5)]=this['_event'][_0x424804(0x2d9)]['offsetY'],this['_eventPageIndex']=this[_0x424804(0x4ab)][_0x424804(0x5f5)],this[_0x424804(0x138)]=this[_0x424804(0x5bd)](),this[_0x424804(0x4b6)]=$gameSystem[_0x424804(0x3f3)](),this[_0x424804(0x28e)]=$gamePlayer['x'],this[_0x424804(0x38d)]=$gamePlayer['y'],this[_0x424804(0x5e7)]=this[_0x424804(0x4ab)]['x'],this[_0x424804(0x4d3)]=this[_0x424804(0x4ab)]['y'];},Window_EventLabel[_0x4cad34(0x3a4)]['update']=function(){const _0x351f35=_0x4cad34;Window_Base[_0x351f35(0x3a4)][_0x351f35(0x3ee)][_0x351f35(0x24b)](this);if(!this['needsUpdate']())return;this[_0x351f35(0x1a4)](),this[_0x351f35(0x409)](),this[_0x351f35(0x37b)](),this[_0x351f35(0x4bd)]();},Window_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x4ca)]=function(){const _0x3ffde6=_0x4cad34;if(!this[_0x3ffde6(0x4ab)])return![];if(!this['_event']['_labelWindow'])return![];if(this[_0x3ffde6(0x29e)]!==this[_0x3ffde6(0x4ab)][_0x3ffde6(0x5f5)])return!![];if(this[_0x3ffde6(0x4ab)][_0x3ffde6(0x499)]&&!this[_0x3ffde6(0xf4)])return!![];if(this['_event'][_0x3ffde6(0x2d9)][_0x3ffde6(0x4b0)]==='')return![];if(this[_0x3ffde6(0x151)]!==$gameScreen['zoomScale']())return!![];if(this['_eventScreenX']!==this[_0x3ffde6(0x4ab)][_0x3ffde6(0x445)]())return!![];if(this[_0x3ffde6(0x2db)]!==this['_event'][_0x3ffde6(0x5c4)]())return!![];if(this['_eventLabelOffsetX']!==this[_0x3ffde6(0x4ab)][_0x3ffde6(0x2d9)][_0x3ffde6(0x27f)])return!![];if(this[_0x3ffde6(0x1f5)]!==this['_event']['_labelWindow'][_0x3ffde6(0x31e)])return!![];if(this[_0x3ffde6(0x28e)]!==$gamePlayer['x'])return!![];if(this[_0x3ffde6(0x38d)]!==$gamePlayer['y'])return!![];if(this['_visibleEventX']!==this[_0x3ffde6(0x4ab)]['x'])return!![];if(this['_visibleEventY']!==this['_event']['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem[_0x3ffde6(0x3f3)]())return!![];if(this['_cacheVisibility']&&this[_0x3ffde6(0x308)]<0xff)return!![];if(!this[_0x3ffde6(0x138)]&&this['contentsOpacity']>0x0)return!![];if(SceneManager[_0x3ffde6(0x568)][_0x3ffde6(0x2a2)]>0x0)return!![];return![];},Window_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x1a4)]=function(){const _0x33538c=_0x4cad34;this[_0x33538c(0x4ab)][_0x33538c(0x3f6)]()!==this[_0x33538c(0x1f3)]&&(this[_0x33538c(0x1f3)]=this[_0x33538c(0x4ab)]['labelWindowText'](),this['refresh']());},Window_EventLabel['prototype'][_0x4cad34(0x409)]=function(){const _0x557895=_0x4cad34;this[_0x557895(0x26f)]['x']=0x1/$gameScreen[_0x557895(0x13c)](),this[_0x557895(0x26f)]['y']=0x1/$gameScreen['zoomScale'](),this['_screenZoomScale']=$gameScreen[_0x557895(0x13c)]();},Window_EventLabel[_0x4cad34(0x3a4)]['updatePosition']=function(){const _0x116b8f=_0x4cad34;if(!SceneManager['_scene'])return;if(!SceneManager[_0x116b8f(0x568)]['_spriteset'])return;const _0x22a7e6=SceneManager[_0x116b8f(0x568)][_0x116b8f(0x1b5)][_0x116b8f(0x254)](this['_event']);if(!_0x22a7e6)return;this['x']=Math[_0x116b8f(0x1b7)](this[_0x116b8f(0x4ab)][_0x116b8f(0x445)]()-Math['floor'](this[_0x116b8f(0x578)]*this[_0x116b8f(0x26f)]['x']/0x2)),this['x']+=this[_0x116b8f(0x4ab)][_0x116b8f(0x2d9)][_0x116b8f(0x27f)],this['y']=this[_0x116b8f(0x4ab)][_0x116b8f(0x5c4)]()-_0x22a7e6[_0x116b8f(0x30f)],this['y']+=Math['round']($gameSystem[_0x116b8f(0x44e)]()*0.5),this['y']-=Math['round'](this[_0x116b8f(0x30f)]*this[_0x116b8f(0x26f)]['y']),this['y']+=this['_event'][_0x116b8f(0x2d9)][_0x116b8f(0x31e)],this['_eventErased']=this['_event'][_0x116b8f(0x499)],this[_0x116b8f(0x1d0)]=this[_0x116b8f(0x4ab)][_0x116b8f(0x445)](),this[_0x116b8f(0x2db)]=this[_0x116b8f(0x4ab)]['screenY'](),this['_eventLabelOffsetX']=this[_0x116b8f(0x4ab)][_0x116b8f(0x2d9)][_0x116b8f(0x27f)],this[_0x116b8f(0x1f5)]=this[_0x116b8f(0x4ab)][_0x116b8f(0x2d9)][_0x116b8f(0x31e)],this[_0x116b8f(0x29e)]=this[_0x116b8f(0x4ab)]['_pageIndex'],this[_0x116b8f(0xf4)]&&(this[_0x116b8f(0x308)]=0x0);},Window_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x4bd)]=function(){const _0x4f4276=_0x4cad34;if(this[_0x4f4276(0x5bd)]())this['contentsOpacity']+=this['opacitySpeed']();else{if(SceneManager['_scene'][_0x4f4276(0x2a2)]>0x0){if('tKrlR'===_0x4f4276(0x545))this['contentsOpacity']=0x0;else{if(this[_0x4f4276(0x579)]())return![];if(this['_isObjectCharacter'])return![];if(this[_0x4f4276(0x5de)]==='')return![];if(this['constructor']===_0x2c564c)return![];if(this[_0x4f4276(0x1ac)]())return![];return!![];}}else this[_0x4f4276(0x308)]-=this[_0x4f4276(0x586)]();}},Window_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x5bd)]=function(){const _0x45c41c=_0x4cad34;if(!$gameSystem[_0x45c41c(0x3f3)]())return![];if(this['_event']?.[_0x45c41c(0x499)])return![];if(SceneManager[_0x45c41c(0x568)][_0x45c41c(0x2a2)]>0x0)return![];const _0x5efc7=$gamePlayer['x'],_0x359699=$gamePlayer['y'],_0x3372dc=this[_0x45c41c(0x4ab)]['x'],_0x4569bd=this['_event']['y'];if(this[_0x45c41c(0x28e)]===_0x5efc7&&this[_0x45c41c(0x38d)]===_0x359699&&this[_0x45c41c(0x5e7)]===_0x3372dc&&this[_0x45c41c(0x4d3)]===_0x4569bd)return _0x45c41c(0x1fd)!==_0x45c41c(0x1fd)?this['screenX']():this[_0x45c41c(0x138)];this['_visiblePlayerX']=$gamePlayer['x'],this[_0x45c41c(0x38d)]=$gamePlayer['y'],this[_0x45c41c(0x5e7)]=this['_event']['x'],this[_0x45c41c(0x4d3)]=this[_0x45c41c(0x4ab)]['y'];if($gameMap[_0x45c41c(0x31f)](_0x5efc7,_0x359699,_0x3372dc,_0x4569bd)>this[_0x45c41c(0x4ab)][_0x45c41c(0x466)]())return this[_0x45c41c(0x138)]=![],![];return this[_0x45c41c(0x138)]=!![],!![];},Window_EventLabel['prototype'][_0x4cad34(0x586)]=function(){const _0x4a5f42=_0x4cad34;return VisuMZ[_0x4a5f42(0x5b2)][_0x4a5f42(0x2f1)][_0x4a5f42(0x28f)]['OpacitySpeed'];},Window_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x51e)]=function(){const _0x5397a3=_0x4cad34,_0x4a01e9=this['textSizeEx'](this['_text']);this['width']=_0x4a01e9[_0x5397a3(0x578)]+($gameSystem[_0x5397a3(0x44e)]()+this[_0x5397a3(0x2a5)]())*0x2,this['height']=Math[_0x5397a3(0x59d)](this[_0x5397a3(0x2b0)](),_0x4a01e9[_0x5397a3(0x30f)])+$gameSystem['windowPadding']()*0x2,this['createContents']();},Window_EventLabel[_0x4cad34(0x3a4)]['lineHeight']=function(){const _0x4a9111=_0x4cad34;return VisuMZ[_0x4a9111(0x5b2)][_0x4a9111(0x2f1)][_0x4a9111(0x28f)][_0x4a9111(0x155)];},Window_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x215)]=function(){const _0x4f1be0=_0x4cad34;Window_Base[_0x4f1be0(0x3a4)][_0x4f1be0(0x215)][_0x4f1be0(0x24b)](this),this['contents'][_0x4f1be0(0x56e)]=this[_0x4f1be0(0x325)]();},Window_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x325)]=function(){const _0x50038e=_0x4cad34;return VisuMZ[_0x50038e(0x5b2)][_0x50038e(0x2f1)]['Label'][_0x50038e(0x1ef)];},Window_EventLabel[_0x4cad34(0x3a4)][_0x4cad34(0x4d9)]=function(){const _0x276f36=_0x4cad34;this['resizeWindow'](),this[_0x276f36(0x226)][_0x276f36(0x133)]();const _0x1e0147=this[_0x276f36(0x1f3)]['split'](/[\r\n]+/);let _0x34aec5=0x0;for(const _0x4485e1 of _0x1e0147){const _0x511e76=this[_0x276f36(0x4fa)](_0x4485e1),_0x3cbe9e=Math['floor']((this['innerWidth']-_0x511e76[_0x276f36(0x578)])/0x2);this['drawTextEx'](_0x4485e1,_0x3cbe9e,_0x34aec5),_0x34aec5+=_0x511e76[_0x276f36(0x30f)];}},Window_EventLabel[_0x4cad34(0x3a4)]['processDrawIcon']=function(_0x32901e,_0x44f56a){const _0x419731=_0x4cad34;_0x44f56a[_0x419731(0x195)]&&this[_0x419731(0x407)](_0x32901e,_0x44f56a['x']+0x2,_0x44f56a['y']),_0x44f56a['x']+=Math[_0x419731(0x2e1)](this[_0x419731(0x44a)](),ImageManager[_0x419731(0x3b3)])+0x4;},Window_EventLabel[_0x4cad34(0x3a4)]['drawIcon']=function(_0x51bf71,_0x1d4c78,_0x4d3f04){const _0x49c126=_0x4cad34,_0x51efdc=ImageManager[_0x49c126(0x3d8)]('IconSet'),_0x262a39=ImageManager[_0x49c126(0x3b3)],_0x2d803d=ImageManager[_0x49c126(0x2de)],_0x49eb52=_0x51bf71%0x10*_0x262a39,_0x458732=Math[_0x49c126(0x53f)](_0x51bf71/0x10)*_0x2d803d,_0x3204aa=Math[_0x49c126(0x2e1)](this['iconSize']()),_0x9b5aba=Math['min'](this['iconSize']());this[_0x49c126(0x226)]['blt'](_0x51efdc,_0x49eb52,_0x458732,_0x262a39,_0x2d803d,_0x1d4c78,_0x4d3f04,_0x3204aa,_0x9b5aba);},Window_EventLabel[_0x4cad34(0x3a4)]['iconSize']=function(){const _0x4f8661=_0x4cad34;return VisuMZ[_0x4f8661(0x5b2)][_0x4f8661(0x2f1)][_0x4f8661(0x28f)][_0x4f8661(0x5f7)];};