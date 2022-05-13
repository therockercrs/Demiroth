//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.31;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.31] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x5851fa=_0x1dac;function _0x2fe1(){const _0x44bfe2=['Sprite_StateIcon_loadBitmap','greater','YSEWn','lSzpR','match','ceil','PayJS','_actor','isBuffAffected','SETjI','ParseSkillNotetags','DataOffsetY','PassiveConditionJS','GroupDigits','CnPoC','_stateSteps','StackBuffMax','heal','prototype','wbauI','Sprite_Gauge_initMembers','clearStatesWithStateRetain','getColorDataFromPluginParameters','Window_StatusBase_drawActorIcons','stateColor','_shopStatusWindow','iZJsh','shopStatusWindowRect','drawItemStyleIconText','changePaintOpacity','isStateAffected','clamp','regenerateAllSkillsStatesCore','stateId','commandName','<troop-%1>','currentMaxValueSkillsStatesCore','ActionEndUpdate','Sprite_Gauge_currentValue','50yvWbDN','meetsSkillConditions','user','actorId','constructor','qmCUQ','buffIconIndex','_result','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','updateStateTurns','onEraseBuff','_itemWindow','MyCpT','coWzD','getSkillTypes','_stateData','fihDl','onExpireStateJS','Scene_Skill_helpWindowRect','_stypeId','tfjwr','nDfwr','slipHp','onEraseDebuff','HGeSX','cqWXs','push','ARRAYJSON','isStateRestrict','TjwaU','bWmhe','Parse_Notetags_Skill_Cost','_turnDisplaySprite','EVAL','rWgQr','parse','ShowTurns','IOLMy','_stateRetainType','SkillsStatesCore','_phase','initMembersSkillsStatesCore','ParseClassIDs','Global','MQMJW','hasSkill','removeStatesAuto','isDebuffAffected','meetsPassiveStateConditionClasses','ListWindowCols','actions','zObRn','buff','_stateOrigin','onAddDebuff','MNkNd','isSkillHidden','createShopStatusWindow','UEyFp','checkSkillTypeMatch','itemAt','useDigitGrouping','djrMV','_states','log','keys','onExpireBuff','testApply','yJzcw','States','MaxTurns','fxEMx','eraseBuff','_currentActor','mainFontFace','Mcnhu','_currentTroopUniqueID','resetTextColor','updateVisibility','skills','format','getStateOrigin','hasStateCategory','indexOf','allowCreateShopStatusWindow','exit','inBattle','Zzpze','shopStatusWidth','onRegenerateCustomStateDamageOverTime','right','Parse_Notetags_Skill_JS','OhFuY','getStateDisplay','clearStates','ZPmhL','Game_BattlerBase_clearStates','SAJKQ','drawTextEx','isBuffOrDebuffAffected','2573128UeRIRc','CmdStyle','slice','sFLhv','iconWidth','onAddStateJS','addPassiveStates','CAddr','includesSkillsStatesCore','onExpireDebuffGlobalJS','gimPJ','Scene_Skill_statusWindowRect','onExpireBuffGlobalJS','drawActorStateData','center','add','createItemWindow','fontSize','scrollTo','alterSkillName','Game_BattlerBase_overwriteBuffTurns','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','convertTargetToStateOriginKey','regenerateAll','isMaxBuffAffected','applyDebuffTurnManipulationEffects','isLearnedSkill','setup','STR','innerWidth','bgTTi','rFMlh','JzKsD','STRUCT','gaugeRate','_skillIDs','tpCost','height','createPassiveStatesCache','TurnOffsetX','stypeId','buttonAssistText1','initMembers','applyStateCategoryRemovalEffects','parameters','PassiveStates','_stypeIDs','untitled','aeBzB','TpBBn','CalcJS','setStatusWindow','DqGKS','split','ColorNegative','Qwnbc','sTuzz','DdbsU','onEraseBuffJS','onEraseDebuffGlobalJS','kMssJ','ParseStateNotetags','ARRAYFUNC','sPbQo','onEraseStateCustomJS','stateTurns','DEF','ZpjdL','bOYhv','OTwsw','_classIDs','onAddBuffJS','success','onRemoveState','fbcNA','ZPIcu','gainSilentTp','Sprite_Gauge_redraw','isRightInputMode','Game_BattlerBase_resetStateCounts','isCommandEnabled','floor','FYJlE','Parse_Notetags_State_SlipEffectJS','onUwU','skill','max','OshtC','clearStateOrigin','Game_Battler_addBuff','gaugeLineHeight','MAT','concat','addBuff','ARRAYSTR','MAXHP','aOXDq','updatedLayoutStyle','getStateReapplyRulings','LsKAD','NUM','EKJOi','convertPassiveStates','eQqkF','calcWindowHeight','name','GNVgX','Sprite_StateIcon_updateFrame','stateData','isAlive','gaugeBackColor','aliveMembers','Parse_Notetags_State_ApplyRemoveLeaveJS','traitsSet','onAddStateCustomJS','BTzij','_statusWindow','uiMenuStyle','mOqkQ','checkSkillConditionsNotetags','buttonAssistSwitch','_stateIDs','bdlHQ','gainHp','width','setDebuffTurns','addDebuff','XRdhl','round','rmMdq','drawExtendedSkillsStatesCoreStatus','addPassiveStatesFromOtherPlugins','itemLineRect','onAddBuff','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Game_BattlerBase_states','slipTp','meetsPassiveStateConditions','Parse_Notetags_State_Category','getCurrentStateActiveUser','onAddDebuffGlobalJS','setStateOrigin','RlOiA','boxWidth','skillTypeWindowRect','statesByCategory','increaseBuff','none','updateHelp','createTurnDisplaySprite','getStateIdWithName','CanPayJS','fillRect','hlyWc','_lastStatesActionEndFrameCount','MDF','makeSuccess','etQgN','ejRUH','uiHelpPosition','helpAreaHeight','overwriteBuffTurns','_stateTurns','rGnnw','EaGnD','MAXMP','Game_BattlerBase_initMembers','_colorCache','bPqsX','setActor','mpDamage','_stored_state-%1-color','isStateCategoryAffected','makeCurrentTroopUniqueID','PglhF','3646120ZpeOIq','helpWindowRect','isUseModernControls','Plbjo','auto','470344zSnBlj','GBRoh','clearStateDisplay','ColorBuff','UwJUc','Game_Troop_setup','initialize','learnSkill','_animationIndex','addPassiveStatesByPluginParameters','helpAreaTop','ShowJS','stateTpSlipDamageJS','_tempBattler','xfZQs','dDOnn','DataFontSize','_stateMaxTurns','stateMpSlipHealJS','Szoly','placeExactGauge','passiveStateObjects','MultiplierJS','Game_BattlerBase_recoverAll','skillEnableJS','<member-%1>','Game_BattlerBase_refresh','makeAdditionalSkillCostText','POSITIVE','recalculateSlipDamageJS','ColorPositive','aQnRO','gudDb','onExpireBuffJS','Game_BattlerBase_buffIconIndex','LVcrF','HRlSB','toUpperCase','action','retrieveStateColor','BnWOP','_buffTurns','zcyMZ','drawActorBuffRates','note','hobwh','sort','Game_BattlerBase_isStateResist','1646145vsAlus','makeCommandName','VHTjU','getStypeIdWithName','damage','isBuffPrevented','isStateExpired','applyBuffTurnManipulationEffects','XCKIB','setBuffTurns','ARRAYEVAL','CheckIncompatibleStates','SkillMenuStatusRect','changeTextColor','AGI','maxSlipDamage','meetsPassiveStateConditionJS','Game_Battler_isStateAddable','Buffs','ignore','drawText','debuffTurns','getStateOriginByKey','states','WsVhS','DataOffsetX','createAllSkillCostText','itemTextAlign','meetsStateCondition','oQOna','muCsV','process_VisuMZ_SkillsStatesCore_Skill_Notetags','BattleManager_endAction','isSkillTypeMatchForUse','Game_Battler_regenerateAll','JHEbJ','_hidden','8070FxLjmZ','Actor','NEGATIVE','process_VisuMZ_SkillsStatesCore_State_Notetags','CoreEngine','bitmap','addCommand','isPassiveStateStackable','endAction','_commandNameWindow','meetsPassiveStateConditionSwitches','lineHeight','onAddDebuffJS','resetFontSettings','skillTypes','VisuMZ_1_ItemsEquipsCore','groupDefeat','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','Window_SkillList_maxCols','6079738fpVJzP','JsodH','addPassiveStatesTraitSets','Game_Actor_learnSkill','PYIRq','XhuqZ','Game_BattlerBase_die','changeOutlineColor','setPassiveStateSlipDamageJS','meetsPassiveStateGlobalConditionJS','uuvLo','drawSkillCost','CheckVisibleBattleNotetags','fontBold','removeBuff','SyONf','VisuMZ_0_CoreEngine','clearStateRetainType','checkShowHideJS','addPassiveStatesByNotetag','Game_BattlerBase_meetsSkillConditions','UFBSM','skillCostSeparator','zojgP','skillTypeWindowRectSkillsStatesCore','Window_StatusBase_placeGauge','updateFrame','convertGaugeTypeSkillsStatesCore','RHari','contents','applyItemUserEffect','onAddState','_categoryWindow','currentClass','_costSettings','description','state','version','isStateAddable','HrJVx','commandNameWindowCenter','gbZkz','onEraseDebuffJS','setBackgroundType','createCommandNameWindow','ARRAYSTRUCT','map','stateEraseJS','IjvFX','Game_BattlerBase_decreaseBuff','drawFullGauge','xJCal','icon','skillTpCost','clearStateData','isStateResist','Sprite_Gauge_setup','KycJl','2512395jpeJtt','SZhUy','paramValueByName','GXBNW','mainAreaTop','isStateCategoryResisted','jNuxZ','Game_BattlerBase_eraseBuff','kqfnd','innerHeight','addDebuffTurns','_stored_debuffColor','Settings','gMNTx','onEraseStateJS','helpWindowRectSkillsStatesCore','Game_BattlerBase_increaseBuff','GaugeCurrentJS','removeStatesByCategory','VxvGg','ColorDebuff','Tkyzi','emVyv','callUpdateHelp','isMaxDebuffAffected','getClassIdWithName','ZwPgr','Window_SkillList_drawItem','Window_SkillList_setActor','onExpireStateCustomJS','decreaseBuff','_checkingVisuMzPassiveStateObjects','call','yuPkc','commandNameWindowDrawBackground','commandStyle','clear','toLowerCase','4QIhrde','skillMpCost','item','Game_BattlerBase_traitsSet','isActor','_tempActor','autoRemovalTiming','updateCommandNameWindow','onDatabaseLoaded','removeStatesByCategoryAll','return\x200','drawActorIcons','placeGauge','isPartyAllAffectedByGroupDefeatStates','multiclasses','gKpMT','drawItem','stateHpSlipHealJS','VisuMZ_2_ClassChangeSystem','drawParamText','_passiveStateResults','BZfOe','enemy','commandStyleCheck','_skillTypeWindow','<enemy-%1>','statePassiveConditionJS','getStateRetainType','itemWindowRect','Window_SkillList_updateHelp','SorOq','setItem','Game_Action_applyItemUserEffect','fraSB','eraseState','removeState','commandNameWindowDrawText','qpapi','uVRqT','xZpyM','iBdMk','slipMp','Window_SkillStatus_refresh','_checkingPassiveStates','oYKwG','addWindow','yraAK','buffLength','_battler','tqwwS','textSizeEx','maxCols','passiveStates','CheckVisibleSwitchNotetags','text','statusWidth','quZvN','CheckVisibleSkillNotetags','applySkillsStatesCoreEffects','mAeiZ','drawActorStateTurns','currentMaxValue','IJvyy','trim','stateCategoriesResisted','zRCHX','ATK','frameCount','onExpireState','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Window_SkillList_includes','ConvertParams','getCurrentStateOriginKey','process_VisuMZ_SkillsStatesCore_Notetags','buffColor','statusWindowRectSkillsStatesCore','onAddStateGlobalJS','actor','normalColor','canUse','GbOvI','drawItemStyleIcon','YTuLL','fontFace','knVuQ','shift','stateExpireJS','Name','addChild','TurnOffsetY','canClearState','DrlqE','Lntan','Game_Battler_addDebuff','FxBmD','status','kMsTO','onEraseBuffGlobalJS','oxxHq','updateStatesActionEnd','makeCommandList','bbIRq','oLqyJ','value','VmAYg','stateMpSlipDamageJS','mainCommandWidth','isUseSkillsStatesCoreUpdatedLayout','stateMaximumTurns','redraw','getSkillIdWithName','isSkillUsableForAutoBattle','isBottomHelpMode','_buffs','fJJAU','statusWindowRect','_checkingTraitsSetSkillsStatesCore','loadBitmap','drawActorBuffTurns','textColor','TextJS','isSkillCostShown','Costs','GaugeMaxJS','_cache','Parse_Notetags_State_PassiveJS','test','Sprite_Gauge_gaugeRate','SkillSceneAdjustSkillList','2004wqlJyS','pAYnY','paySkillCost','rhgER','JrpHC','applyStateTurnManipulationEffects','Game_Action_testApply','stateHpSlipDamageJS','isGroupDefeatStateAffected','addState','#%1','drawIcon','meetsSkillConditionsEnableJS','gainMp','reset','%1\x20%2\x20%3','iconHeight','outlineColor','buffTurns','debuffColor','usableSkills','mraVg','currentValue','includes','onExpireDebuffJS','uiInputPosition','totalStateCategoryAffected','rDkTx','Window_SkillType_initialize','SCkgM','index','currentValueSkillsStatesCore','isBuffExpired','RfqWx','itemWindowRectSkillsStatesCore','Skills','replace','_subject','redrawSkillsStatesCore','pqUjg','setupSkillsStatesCore','stepsForTurn','anchor','rfoPs','categories','addStateTurns','adjustItemWidthByShopStatus','rEbih','setStateTurns','GaugeDrawJS','iconIndex','Game_Actor_forgetSkill','drawExtendedParameter','length','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Scene_Boot_onDatabaseLoaded','shopStatusWindowRectSkillsStatesCore','sNIKQ','NFhng','die','%1%','LayoutStyle','onExpireDebuff','iconText','allIcons','_stateDisplay','IJuDc','uVZeK','lDbnS','recoverAll','Scene_Skill_itemWindowRect','rDcyW','isStateRemoved','qAfEk','rgba(0,\x200,\x200,\x201)','currentDisplayedValue','dklgT','_skills','LUK','isPlaytest','skillVisibleJS','FUNC','rFvGr','priority','drawActorIconsAllTurnCounters','Game_BattlerBase_skillMpCost','OlNUm','recover\x20all','WhJzk','dNash','Scene_Skill_createItemWindow','TurnFontSize','RlVii','filter','totalStateCategory','number','Sprite_Gauge_currentMaxValue','onAddStateMakeCustomSlipValues','updateTurnDisplaySprite','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','setStateRetainType','Game_BattlerBase_eraseState','windowPadding','hasState','getStateData','testSkillStatesCoreNotetags','checkSkillConditionsSwitchNotetags','mKXyh','createSkillCostText','mpCost','hpDamage','DisplayedParams','ndGFO','ARRAYNUM','forgetSkill','onExpireStateGlobalJS','Scene_Skill_skillTypeWindowRect','stateAddJS','makeResistedStateCategories','bCQbv','ReapplyRules','onEraseStateGlobalJS','ldDXD','iWere','refresh','cPOcM','prpmm','resetStateCounts'];_0x2fe1=function(){return _0x44bfe2;};return _0x2fe1();}(function(_0x223653,_0x510834){const _0x543f43=_0x1dac,_0xd0f07a=_0x223653();while(!![]){try{const _0x3fc115=parseInt(_0x543f43(0x1c7))/0x1*(parseInt(_0x543f43(0x407))/0x2)+-parseInt(_0x543f43(0x1a1))/0x3+-parseInt(_0x543f43(0x353))/0x4+-parseInt(_0x543f43(0x154))/0x5*(-parseInt(_0x543f43(0x248))/0x6)+-parseInt(_0x543f43(0x167))/0x7+parseInt(_0x543f43(0x402))/0x8+-parseInt(_0x543f43(0x437))/0x9*(-parseInt(_0x543f43(0x2ef))/0xa);if(_0x3fc115===_0x510834)break;else _0xd0f07a['push'](_0xd0f07a['shift']());}catch(_0x509db6){_0xd0f07a['push'](_0xd0f07a['shift']());}}}(_0x2fe1,0x7a425));function _0x1dac(_0x474d5c,_0x290eec){const _0x2fe1fa=_0x2fe1();return _0x1dac=function(_0x1dacc6,_0x3b1e55){_0x1dacc6=_0x1dacc6-0x14c;let _0x312952=_0x2fe1fa[_0x1dacc6];return _0x312952;},_0x1dac(_0x474d5c,_0x290eec);}var label=_0x5851fa(0x316),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5851fa(0x2a5)](function(_0xc9f931){const _0x1b3270=_0x5851fa;return _0xc9f931[_0x1b3270(0x226)]&&_0xc9f931['description'][_0x1b3270(0x25f)]('['+label+']');})[0x0];VisuMZ[label][_0x5851fa(0x1ad)]=VisuMZ[label][_0x5851fa(0x1ad)]||{},VisuMZ['ConvertParams']=function(_0x5735a3,_0x22ee38){const _0x301a7e=_0x5851fa;for(const _0xacc915 in _0x22ee38){if('KycJl'!==_0x301a7e(0x1a0))return _0x342be8[_0x301a7e(0x2fd)](_0xb01a63)[_0x301a7e(0x25f)](this[_0x301a7e(0x302)]);else{if(_0xacc915[_0x301a7e(0x2cc)](/(.*):(.*)/i)){const _0x18e5ce=String(RegExp['$1']),_0x46b1f0=String(RegExp['$2'])[_0x301a7e(0x42c)]()[_0x301a7e(0x206)]();let _0x5b9ded,_0x392b1b,_0x4dd4fd;switch(_0x46b1f0){case _0x301a7e(0x3b7):_0x5b9ded=_0x22ee38[_0xacc915]!==''?Number(_0x22ee38[_0xacc915]):0x0;break;case _0x301a7e(0x2b9):_0x392b1b=_0x22ee38[_0xacc915]!==''?JSON[_0x301a7e(0x312)](_0x22ee38[_0xacc915]):[],_0x5b9ded=_0x392b1b[_0x301a7e(0x195)](_0x3557c5=>Number(_0x3557c5));break;case _0x301a7e(0x310):_0x5b9ded=_0x22ee38[_0xacc915]!==''?eval(_0x22ee38[_0xacc915]):null;break;case _0x301a7e(0x441):_0x392b1b=_0x22ee38[_0xacc915]!==''?JSON[_0x301a7e(0x312)](_0x22ee38[_0xacc915]):[],_0x5b9ded=_0x392b1b[_0x301a7e(0x195)](_0x45580a=>eval(_0x45580a));break;case'JSON':_0x5b9ded=_0x22ee38[_0xacc915]!==''?JSON[_0x301a7e(0x312)](_0x22ee38[_0xacc915]):'';break;case _0x301a7e(0x30a):_0x392b1b=_0x22ee38[_0xacc915]!==''?JSON[_0x301a7e(0x312)](_0x22ee38[_0xacc915]):[],_0x5b9ded=_0x392b1b[_0x301a7e(0x195)](_0xb800ac=>JSON[_0x301a7e(0x312)](_0xb800ac));break;case _0x301a7e(0x299):_0x5b9ded=_0x22ee38[_0xacc915]!==''?new Function(JSON[_0x301a7e(0x312)](_0x22ee38[_0xacc915])):new Function(_0x301a7e(0x1d1));break;case _0x301a7e(0x391):_0x392b1b=_0x22ee38[_0xacc915]!==''?JSON[_0x301a7e(0x312)](_0x22ee38[_0xacc915]):[],_0x5b9ded=_0x392b1b[_0x301a7e(0x195)](_0x2b715b=>new Function(JSON[_0x301a7e(0x312)](_0x2b715b)));break;case _0x301a7e(0x36f):_0x5b9ded=_0x22ee38[_0xacc915]!==''?String(_0x22ee38[_0xacc915]):'';break;case _0x301a7e(0x3b1):_0x392b1b=_0x22ee38[_0xacc915]!==''?JSON['parse'](_0x22ee38[_0xacc915]):[],_0x5b9ded=_0x392b1b[_0x301a7e(0x195)](_0xa769fb=>String(_0xa769fb));break;case _0x301a7e(0x374):_0x4dd4fd=_0x22ee38[_0xacc915]!==''?JSON['parse'](_0x22ee38[_0xacc915]):{},_0x5735a3[_0x18e5ce]={},VisuMZ[_0x301a7e(0x20e)](_0x5735a3[_0x18e5ce],_0x4dd4fd);continue;case _0x301a7e(0x194):_0x392b1b=_0x22ee38[_0xacc915]!==''?JSON['parse'](_0x22ee38[_0xacc915]):[],_0x5b9ded=_0x392b1b[_0x301a7e(0x195)](_0x246eb8=>VisuMZ['ConvertParams']({},JSON['parse'](_0x246eb8)));break;default:continue;}_0x5735a3[_0x18e5ce]=_0x5b9ded;}}}return _0x5735a3;},(_0x17e7d0=>{const _0x26b407=_0x5851fa,_0x47d094=_0x17e7d0[_0x26b407(0x3bc)];for(const _0x10df9e of dependencies){if(!Imported[_0x10df9e]){if(_0x26b407(0x326)!==_0x26b407(0x225)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x47d094,_0x10df9e)),SceneManager['exit']();break;}else _0x194454['SkillsStatesCore'][_0x26b407(0x1ad)][_0x26b407(0x334)][_0x26b407(0x1af)][_0x26b407(0x1c1)](this,_0x47661e);}}const _0x1eff89=_0x17e7d0[_0x26b407(0x18a)];if(_0x1eff89[_0x26b407(0x2cc)](/\[Version[ ](.*?)\]/i)){const _0x54c5cf=Number(RegExp['$1']);_0x54c5cf!==VisuMZ[label][_0x26b407(0x18c)]&&(alert(_0x26b407(0x368)['format'](_0x47d094,_0x54c5cf)),SceneManager[_0x26b407(0x344)]());}if(_0x1eff89['match'](/\[Tier[ ](\d+)\]/i)){const _0x4541dc=Number(RegExp['$1']);if(_0x4541dc<tier){if(_0x26b407(0x3d2)!==_0x26b407(0x3d2)){if(this[_0x26b407(0x302)]===_0x540ddc)return;this['_stypeId']=_0x9e730,this[_0x26b407(0x2c4)](),this[_0x26b407(0x365)](0x0,0x0),this[_0x26b407(0x3c7)]&&this[_0x26b407(0x3c7)][_0x26b407(0x2f3)]===_0x22df52&&this[_0x26b407(0x3c7)][_0x26b407(0x1e6)](this[_0x26b407(0x32b)](0x0));}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x26b407(0x33f)](_0x47d094,_0x4541dc,tier)),SceneManager['exit']();}else _0x26b407(0x16c)!=='TUcHx'?tier=Math[_0x26b407(0x3a9)](_0x4541dc,tier):this[_0x26b407(0x328)]();}VisuMZ[_0x26b407(0x20e)](VisuMZ[label][_0x26b407(0x1ad)],_0x17e7d0[_0x26b407(0x37f)]);})(pluginData),VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x27f)]=Scene_Boot['prototype'][_0x5851fa(0x1cf)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x25d664=_0x5851fa;VisuMZ[_0x25d664(0x316)]['Scene_Boot_onDatabaseLoaded'][_0x25d664(0x1c1)](this),this[_0x25d664(0x210)](),VisuMZ[_0x25d664(0x316)][_0x25d664(0x442)]();},Scene_Boot[_0x5851fa(0x2da)][_0x5851fa(0x210)]=function(){const _0x19de99=_0x5851fa;if(VisuMZ['ParseAllNotetags'])return;this[_0x19de99(0x14e)](),this[_0x19de99(0x157)]();},Scene_Boot[_0x5851fa(0x2da)][_0x5851fa(0x14e)]=function(){const _0x238c0a=_0x5851fa;for(const _0x4fc71a of $dataSkills){if(_0x238c0a(0x1a2)==='SZhUy'){if(!_0x4fc71a)continue;VisuMZ[_0x238c0a(0x316)][_0x238c0a(0x30e)](_0x4fc71a),VisuMZ['SkillsStatesCore'][_0x238c0a(0x34a)](_0x4fc71a);}else _0x16b523[_0x238c0a(0x316)][_0x238c0a(0x1ad)][_0x238c0a(0x449)][_0x238c0a(0x428)][_0x238c0a(0x1c1)](this,_0x142a05);}},Scene_Boot[_0x5851fa(0x2da)][_0x5851fa(0x157)]=function(){const _0x32d060=_0x5851fa;for(const _0x35f44f of $dataStates){if(!_0x35f44f)continue;VisuMZ[_0x32d060(0x316)][_0x32d060(0x3dd)](_0x35f44f),VisuMZ[_0x32d060(0x316)][_0x32d060(0x244)](_0x35f44f),VisuMZ['SkillsStatesCore'][_0x32d060(0x3a6)](_0x35f44f),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x35f44f);}},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x2d2)]=VisuMZ[_0x5851fa(0x2d2)],VisuMZ[_0x5851fa(0x2d2)]=function(_0x3592b3){const _0x127500=_0x5851fa;VisuMZ[_0x127500(0x316)]['ParseSkillNotetags']['call'](this,_0x3592b3),VisuMZ[_0x127500(0x316)]['Parse_Notetags_Skill_Cost'](_0x3592b3),VisuMZ[_0x127500(0x316)]['Parse_Notetags_Skill_JS'](_0x3592b3);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x390)]=VisuMZ[_0x5851fa(0x390)],VisuMZ[_0x5851fa(0x390)]=function(_0x53a65a){const _0x46a53b=_0x5851fa;VisuMZ[_0x46a53b(0x316)]['ParseStateNotetags'][_0x46a53b(0x1c1)](this,_0x53a65a),VisuMZ['SkillsStatesCore'][_0x46a53b(0x3dd)](_0x53a65a),VisuMZ[_0x46a53b(0x316)][_0x46a53b(0x244)](_0x53a65a),VisuMZ[_0x46a53b(0x316)][_0x46a53b(0x3a6)](_0x53a65a),VisuMZ[_0x46a53b(0x316)][_0x46a53b(0x3c3)](_0x53a65a);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x30e)]=function(_0x4e4fa2){const _0x61b137=_0x5851fa,_0x7881b4=_0x4e4fa2['note'];_0x7881b4['match'](/<MP COST:[ ](\d+)>/i)&&(_0x61b137(0x30d)!==_0x61b137(0x1d6)?_0x4e4fa2[_0x61b137(0x2b5)]=Number(RegExp['$1']):this[_0x61b137(0x3c7)][_0x61b137(0x1e6)](this[_0x61b137(0x32b)](0x0)));if(_0x7881b4[_0x61b137(0x2cc)](/<TP COST:[ ](\d+)>/i)){if(_0x61b137(0x277)!==_0x61b137(0x277))return _0xce0652[_0x61b137(0x3f2)];else _0x4e4fa2[_0x61b137(0x377)]=Number(RegExp['$1']);}},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x41f)]={},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x298)]={},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x34a)]=function(_0x11458b){const _0x151ac8=_0x5851fa,_0x5d8f55=_0x11458b[_0x151ac8(0x433)];if(_0x5d8f55[_0x151ac8(0x2cc)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0xfd59e2=String(RegExp['$1']),_0x393777='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0xfd59e2);VisuMZ[_0x151ac8(0x316)][_0x151ac8(0x41f)][_0x11458b['id']]=new Function('skill',_0x393777);}if(_0x5d8f55['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if(_0x151ac8(0x3f1)==='obQYI'){const _0x32d659=0x0,_0x457d89=this[_0x151ac8(0x411)](),_0x48210c=_0x85ab25[_0x151ac8(0x3e2)],_0x1cb56f=this[_0x151ac8(0x3f3)]();return new _0xfb98bd(_0x32d659,_0x457d89,_0x48210c,_0x1cb56f);}else{const _0x1eb921=String(RegExp['$1']),_0xbfac0b=_0x151ac8(0x20c)[_0x151ac8(0x33f)](_0x1eb921);VisuMZ[_0x151ac8(0x316)]['skillVisibleJS'][_0x11458b['id']]=new Function(_0x151ac8(0x3a8),_0xbfac0b);}}},VisuMZ[_0x5851fa(0x316)]['Parse_Notetags_State_Category']=function(_0x3c9494){const _0x20b6ee=_0x5851fa;_0x3c9494[_0x20b6ee(0x274)]=['ALL','ANY'];const _0x10872e=_0x3c9494['note'],_0x5971f5=_0x10872e[_0x20b6ee(0x2cc)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x5971f5)for(const _0x4038ff of _0x5971f5){if(_0x20b6ee(0x1e8)==='YACFs'){if(typeof _0x151d50!==_0x20b6ee(0x2a7))_0x2be45f=_0x2e32d8['id'];this[_0x20b6ee(0x2fe)]=this[_0x20b6ee(0x2fe)]||{},this[_0x20b6ee(0x2fe)][_0x3777f9]={};}else{_0x4038ff[_0x20b6ee(0x2cc)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x6e3dc=String(RegExp['$1'])[_0x20b6ee(0x42c)]()['trim']()['split'](',');for(const _0x186d4c of _0x6e3dc){if('iJnHc'==='EETGD')return new _0xd568ec(_0x364496(_0x1dc3a3['$1']),-0x1f4,-0x1f4);else _0x3c9494[_0x20b6ee(0x274)][_0x20b6ee(0x309)](_0x186d4c[_0x20b6ee(0x206)]());}}}if(_0x10872e[_0x20b6ee(0x2cc)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x20b6ee(0x17c)===_0x20b6ee(0x329))return _0x266a56[_0x20b6ee(0x3cb)];else{const _0x4e3bcd=RegExp['$1'][_0x20b6ee(0x388)](/[\r\n]+/);for(const _0xb63690 of _0x4e3bcd){if('yJzcw'!==_0x20b6ee(0x333))return this[_0x20b6ee(0x1f7)]&&this[_0x20b6ee(0x189)]?this[_0x20b6ee(0x267)]():_0x28622b['SkillsStatesCore'][_0x20b6ee(0x2ee)]['call'](this);else _0x3c9494[_0x20b6ee(0x274)][_0x20b6ee(0x309)](_0xb63690[_0x20b6ee(0x42c)]()[_0x20b6ee(0x206)]());}}}if(_0x10872e['match'](/<POSITIVE STATE>/i)){if(_0x20b6ee(0x3b3)==='EQKpi')return!![];else _0x3c9494[_0x20b6ee(0x274)][_0x20b6ee(0x309)](_0x20b6ee(0x423));}_0x10872e[_0x20b6ee(0x2cc)](/<NEGATIVE STATE>/i)&&_0x3c9494['categories'][_0x20b6ee(0x309)](_0x20b6ee(0x156));},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x1e1)]={},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x244)]=function(_0x33ce6c){const _0x4c8b6f=_0x5851fa,_0xdbae78=_0x33ce6c[_0x4c8b6f(0x433)];if(_0xdbae78[_0x4c8b6f(0x2cc)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x117abc=String(RegExp['$1']),_0x319849=_0x4c8b6f(0x2ab)[_0x4c8b6f(0x33f)](_0x117abc);VisuMZ[_0x4c8b6f(0x316)][_0x4c8b6f(0x1e1)][_0x33ce6c['id']]=new Function(_0x4c8b6f(0x18b),_0x319849);}},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x24f)]={},VisuMZ['SkillsStatesCore']['stateHpSlipHealJS']={},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x230)]={},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x419)]={},VisuMZ['SkillsStatesCore'][_0x5851fa(0x413)]={},VisuMZ[_0x5851fa(0x316)]['stateTpSlipHealJS']={},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x3a6)]=function(_0x411447){const _0x2acad4=_0x5851fa,_0x577dc4=_0x411447[_0x2acad4(0x433)],_0x523b06=_0x2acad4(0x2f7);if(_0x577dc4[_0x2acad4(0x2cc)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){if('plLiM'===_0x2acad4(0x1ee))return!![];else{const _0x5d2c3c=String(RegExp['$1']),_0x53d918=_0x523b06[_0x2acad4(0x33f)](_0x5d2c3c,_0x2acad4(0x43b),-0x1,'slipHp');VisuMZ[_0x2acad4(0x316)]['stateHpSlipDamageJS'][_0x411447['id']]=new Function('stateId',_0x53d918);}}else{if(_0x577dc4[_0x2acad4(0x2cc)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){if('kfCEI'===_0x2acad4(0x171)){if(!this['canUse'](_0x59fb3a))return![];if(!_0x4dca17)return![];if(!this[_0x2acad4(0x150)](_0x593978))return![];if(this[_0x2acad4(0x327)](_0x22e7f0))return![];return!![];}else{const _0x37728d=String(RegExp['$1']),_0x3cb8eb=_0x523b06[_0x2acad4(0x33f)](_0x37728d,'heal',0x1,_0x2acad4(0x305));VisuMZ[_0x2acad4(0x316)]['stateHpSlipHealJS'][_0x411447['id']]=new Function(_0x2acad4(0x2e9),_0x3cb8eb);}}}if(_0x577dc4[_0x2acad4(0x2cc)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if(_0x2acad4(0x392)==='sPbQo'){const _0x2e9ce5=String(RegExp['$1']),_0x4a2b04=_0x523b06[_0x2acad4(0x33f)](_0x2e9ce5,_0x2acad4(0x43b),-0x1,_0x2acad4(0x1f0));VisuMZ[_0x2acad4(0x316)]['stateMpSlipDamageJS'][_0x411447['id']]=new Function(_0x2acad4(0x2e9),_0x4a2b04);}else this[_0x2acad4(0x31e)](_0x422982)&&(_0x1bc372+=this[_0x2acad4(0x25a)](_0x4dea76),this['setStateTurns'](_0x418744,_0x1f90b9));}else{if(_0x577dc4[_0x2acad4(0x2cc)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x306ea1=String(RegExp['$1']),_0x59e728=_0x523b06[_0x2acad4(0x33f)](_0x306ea1,_0x2acad4(0x2d9),0x1,_0x2acad4(0x1f0));VisuMZ[_0x2acad4(0x316)][_0x2acad4(0x419)][_0x411447['id']]=new Function(_0x2acad4(0x2e9),_0x59e728);}}if(_0x577dc4[_0x2acad4(0x2cc)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){if(_0x2acad4(0x32d)!==_0x2acad4(0x32d)){if(_0x2ff182['length']>0x0)_0x3ac82b+=this['skillCostSeparator']();_0x7043f1+=_0x1ac4fc(_0x337f3b['$1']);}else{const _0x4ac9cf=String(RegExp['$1']),_0xf4c187=_0x523b06[_0x2acad4(0x33f)](_0x4ac9cf,_0x2acad4(0x43b),-0x1,_0x2acad4(0x3db));VisuMZ[_0x2acad4(0x316)][_0x2acad4(0x413)][_0x411447['id']]=new Function(_0x2acad4(0x2e9),_0xf4c187);}}else{if(_0x577dc4[_0x2acad4(0x2cc)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if('qAfEk'!==_0x2acad4(0x291)){const _0xaae271=_0x3ed2ff[_0x2acad4(0x433)];if(_0xaae271[_0x2acad4(0x2cc)](/<HIDE IN BATTLE>/i)&&_0x3fa407[_0x2acad4(0x345)]())return![];else return _0xaae271[_0x2acad4(0x2cc)](/<HIDE OUTSIDE BATTLE>/i)&&!_0x370b51[_0x2acad4(0x345)]()?![]:!![];}else{const _0x38057a=String(RegExp['$1']),_0x47c514=_0x523b06[_0x2acad4(0x33f)](_0x38057a,_0x2acad4(0x2d9),0x1,_0x2acad4(0x3db));VisuMZ[_0x2acad4(0x316)]['stateTpSlipHealJS'][_0x411447['id']]=new Function('stateId',_0x47c514);}}}},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x2bd)]={},VisuMZ[_0x5851fa(0x316)]['stateEraseJS']={},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x21d)]={},VisuMZ['SkillsStatesCore'][_0x5851fa(0x3c3)]=function(_0x463d02){const _0x5038ac=_0x5851fa,_0x32f0a5=_0x463d02[_0x5038ac(0x433)],_0x5c4744=_0x5038ac(0x165);if(_0x32f0a5[_0x5038ac(0x2cc)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){if(_0x5038ac(0x227)!==_0x5038ac(0x227))_0x4d59d8[_0x5038ac(0x316)]['Game_Actor_learnSkill'][_0x5038ac(0x1c1)](this,_0x47c94d),this['_cache']={};else{const _0xfca2ec=String(RegExp['$1']),_0x246600=_0x5c4744[_0x5038ac(0x33f)](_0xfca2ec);VisuMZ[_0x5038ac(0x316)][_0x5038ac(0x2bd)][_0x463d02['id']]=new Function(_0x5038ac(0x2e9),_0x246600);}}if(_0x32f0a5[_0x5038ac(0x2cc)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){if(_0x5038ac(0x1f5)!==_0x5038ac(0x307)){const _0x7ebecb=String(RegExp['$1']),_0x119157=_0x5c4744[_0x5038ac(0x33f)](_0x7ebecb);VisuMZ[_0x5038ac(0x316)][_0x5038ac(0x196)][_0x463d02['id']]=new Function('stateId',_0x119157);}else return _0x44cab9['SkillsStatesCore'][_0x5038ac(0x1ad)]['PassiveStates']['PassiveConditionJS'][_0x5038ac(0x1c1)](this,_0x2b43c1);}if(_0x32f0a5[_0x5038ac(0x2cc)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){if(_0x5038ac(0x1a7)!==_0x5038ac(0x33a)){const _0x3dc766=String(RegExp['$1']),_0x267bd8=_0x5c4744[_0x5038ac(0x33f)](_0x3dc766);VisuMZ[_0x5038ac(0x316)]['stateExpireJS'][_0x463d02['id']]=new Function(_0x5038ac(0x2e9),_0x267bd8);}else _0x6f8204['SkillsStatesCore']['Settings'][_0x5038ac(0x449)]['onExpireDebuffJS'][_0x5038ac(0x1c1)](this,_0x5c8231);}},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x442)]=function(){const _0x3a8b14=_0x5851fa;if(!VisuMZ['SkillsStatesCore']['Settings'][_0x3a8b14(0x334)][_0x3a8b14(0x2ed)])return;for(const _0x5d4671 of $dataStates){if(_0x3a8b14(0x416)!==_0x3a8b14(0x416))this[_0x3a8b14(0x315)]='',this[_0x3a8b14(0x2fe)]={},this[_0x3a8b14(0x289)]={},this['_stateOrigin']={};else{if(!_0x5d4671)continue;if(_0x5d4671['restriction']===0x4&&_0x5d4671[_0x3a8b14(0x1cd)]===0x1){if(_0x3a8b14(0x1ae)!=='gMNTx'){const _0x6aa0a=this['getStateRetainType']();if(_0x6aa0a!==''){const _0x2af1d9=_0xc85e25[_0x3a8b14(0x433)];if(_0x6aa0a==='death'&&_0x2af1d9['match'](/<NO DEATH CLEAR>/i))return![];if(_0x6aa0a===_0x3a8b14(0x29f)&&_0x2af1d9[_0x3a8b14(0x2cc)](/<NO RECOVER ALL CLEAR>/i))return![];}return this['isStateAffected'](_0x29b96f['id']);}else _0x5d4671['autoRemovalTiming']=0x2;}}}},DataManager[_0x5851fa(0x1ba)]=function(_0x56d00d){const _0x5a6128=_0x5851fa;_0x56d00d=_0x56d00d['toUpperCase']()[_0x5a6128(0x206)](),this[_0x5a6128(0x399)]=this['_classIDs']||{};if(this['_classIDs'][_0x56d00d])return this[_0x5a6128(0x399)][_0x56d00d];for(const _0x13245d of $dataClasses){if(!_0x13245d)continue;let _0x154c90=_0x13245d[_0x5a6128(0x3bc)];_0x154c90=_0x154c90[_0x5a6128(0x26c)](/\x1I\[(\d+)\]/gi,''),_0x154c90=_0x154c90[_0x5a6128(0x26c)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x154c90[_0x5a6128(0x42c)]()['trim']()]=_0x13245d['id'];}return this[_0x5a6128(0x399)][_0x56d00d]||0x0;},DataManager[_0x5851fa(0x2fd)]=function(_0x2e79a2){const _0x1b02ee=_0x5851fa;this[_0x1b02ee(0x381)]=this['_stypeIDs']||{};if(this[_0x1b02ee(0x381)][_0x2e79a2['id']])return this[_0x1b02ee(0x381)][_0x2e79a2['id']];this[_0x1b02ee(0x381)][_0x2e79a2['id']]=[_0x2e79a2[_0x1b02ee(0x37b)]];if(_0x2e79a2[_0x1b02ee(0x433)][_0x1b02ee(0x2cc)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xf8b367=JSON['parse']('['+RegExp['$1'][_0x1b02ee(0x2cc)](/\d+/g)+']');this[_0x1b02ee(0x381)][_0x2e79a2['id']]=this[_0x1b02ee(0x381)][_0x2e79a2['id']][_0x1b02ee(0x3af)](_0xf8b367);}else{if(_0x2e79a2[_0x1b02ee(0x433)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x471488=RegExp['$1'][_0x1b02ee(0x388)](',');for(const _0x5a25b1 of _0x471488){const _0x8f1798=DataManager[_0x1b02ee(0x43a)](_0x5a25b1);if(_0x8f1798)this[_0x1b02ee(0x381)][_0x2e79a2['id']]['push'](_0x8f1798);}}}return this[_0x1b02ee(0x381)][_0x2e79a2['id']];},DataManager[_0x5851fa(0x43a)]=function(_0x393455){const _0x1c05bf=_0x5851fa;_0x393455=_0x393455[_0x1c05bf(0x42c)]()[_0x1c05bf(0x206)](),this[_0x1c05bf(0x381)]=this[_0x1c05bf(0x381)]||{};if(this[_0x1c05bf(0x381)][_0x393455])return this[_0x1c05bf(0x381)][_0x393455];for(let _0x443544=0x1;_0x443544<0x64;_0x443544++){if(!$dataSystem[_0x1c05bf(0x162)][_0x443544])continue;let _0x21ed83=$dataSystem['skillTypes'][_0x443544][_0x1c05bf(0x42c)]()['trim']();_0x21ed83=_0x21ed83[_0x1c05bf(0x26c)](/\x1I\[(\d+)\]/gi,''),_0x21ed83=_0x21ed83[_0x1c05bf(0x26c)](/\\I\[(\d+)\]/gi,''),this[_0x1c05bf(0x381)][_0x21ed83]=_0x443544;}return this[_0x1c05bf(0x381)][_0x393455]||0x0;},DataManager[_0x5851fa(0x235)]=function(_0x21349a){const _0x27a4fc=_0x5851fa;_0x21349a=_0x21349a[_0x27a4fc(0x42c)]()['trim'](),this[_0x27a4fc(0x376)]=this[_0x27a4fc(0x376)]||{};if(this[_0x27a4fc(0x376)][_0x21349a])return this[_0x27a4fc(0x376)][_0x21349a];for(const _0x41b450 of $dataSkills){if('LDSOw'!==_0x27a4fc(0x202)){if(!_0x41b450)continue;this[_0x27a4fc(0x376)][_0x41b450['name'][_0x27a4fc(0x42c)]()[_0x27a4fc(0x206)]()]=_0x41b450['id'];}else return _0x2fd8b5;}return this['_skillIDs'][_0x21349a]||0x0;},DataManager['getStateIdWithName']=function(_0x2da1fa){const _0x496674=_0x5851fa;_0x2da1fa=_0x2da1fa[_0x496674(0x42c)]()[_0x496674(0x206)](),this[_0x496674(0x3cc)]=this[_0x496674(0x3cc)]||{};if(this[_0x496674(0x3cc)][_0x2da1fa])return this[_0x496674(0x3cc)][_0x2da1fa];for(const _0x15e5fc of $dataStates){if(_0x496674(0x308)===_0x496674(0x22d)){const _0x31036f=_0x441157(_0x594761['$1']),_0x272eb3=_0x38acf2[_0x496674(0x33f)](_0x31036f,_0x496674(0x43b),-0x1,_0x496674(0x1f0));_0x36ca56[_0x496674(0x316)][_0x496674(0x230)][_0x4864e2['id']]=new _0x5f1626(_0x496674(0x2e9),_0x272eb3);}else{if(!_0x15e5fc)continue;this[_0x496674(0x3cc)][_0x15e5fc[_0x496674(0x3bc)][_0x496674(0x42c)]()['trim']()]=_0x15e5fc['id'];}}return this[_0x496674(0x3cc)][_0x2da1fa]||0x0;},DataManager[_0x5851fa(0x233)]=function(_0x282100){const _0xca366c=_0x5851fa;this[_0xca366c(0x418)]=this[_0xca366c(0x418)]||{};if(this['_stateMaxTurns'][_0x282100])return this[_0xca366c(0x418)][_0x282100];return $dataStates[_0x282100][_0xca366c(0x433)]['match'](/<MAX TURNS:[ ](\d+)>/i)?this['_stateMaxTurns'][_0x282100]=Number(RegExp['$1']):this[_0xca366c(0x418)][_0x282100]=VisuMZ[_0xca366c(0x316)][_0xca366c(0x1ad)][_0xca366c(0x334)][_0xca366c(0x335)],this['_stateMaxTurns'][_0x282100];},ColorManager[_0x5851fa(0x2de)]=function(_0x57bbaf,_0x5797ff){const _0x4672cf=_0x5851fa;return _0x5797ff=String(_0x5797ff),this[_0x4672cf(0x3fa)]=this[_0x4672cf(0x3fa)]||{},_0x5797ff['match'](/#(.*)/i)?this['_colorCache'][_0x57bbaf]=_0x4672cf(0x252)['format'](String(RegExp['$1'])):this[_0x4672cf(0x3fa)][_0x57bbaf]=this[_0x4672cf(0x23e)](Number(_0x5797ff)),this['_colorCache'][_0x57bbaf];},ColorManager['getColor']=function(_0x1afe44){const _0x27d09d=_0x5851fa;_0x1afe44=String(_0x1afe44);if(_0x1afe44['match'](/#(.*)/i)){if(_0x27d09d(0x43f)===_0x27d09d(0x43f))return'#%1'[_0x27d09d(0x33f)](String(RegExp['$1']));else _0x151c38=_0x3e9a5b,_0x4b37c4+=_0x3a4aef;}else return this['textColor'](Number(_0x1afe44));},ColorManager[_0x5851fa(0x2e0)]=function(_0x48edeb){const _0x2a0172=_0x5851fa;if(typeof _0x48edeb==='number')_0x48edeb=$dataStates[_0x48edeb];const _0x18690f=_0x2a0172(0x3fe)[_0x2a0172(0x33f)](_0x48edeb['id']);this[_0x2a0172(0x3fa)]=this[_0x2a0172(0x3fa)]||{};if(this[_0x2a0172(0x3fa)][_0x18690f])return this[_0x2a0172(0x3fa)][_0x18690f];const _0x382f36=this[_0x2a0172(0x42e)](_0x48edeb);return this['getColorDataFromPluginParameters'](_0x18690f,_0x382f36);},ColorManager[_0x5851fa(0x42e)]=function(_0x1e83dc){const _0x3622f2=_0x5851fa,_0x50885a=_0x1e83dc[_0x3622f2(0x433)];if(_0x50885a[_0x3622f2(0x2cc)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x50885a[_0x3622f2(0x2cc)](/<POSITIVE STATE>/i))return VisuMZ[_0x3622f2(0x316)][_0x3622f2(0x1ad)][_0x3622f2(0x334)][_0x3622f2(0x425)];else{if(_0x50885a[_0x3622f2(0x2cc)](/<NEGATIVE STATE>/i))return VisuMZ[_0x3622f2(0x316)][_0x3622f2(0x1ad)][_0x3622f2(0x334)][_0x3622f2(0x389)];else{if(_0x3622f2(0x397)!==_0x3622f2(0x397))_0x4b4d00+=this[_0x3622f2(0x394)](_0xe10cd1),this[_0x3622f2(0x278)](_0x13c32c,_0x8fc509);else return VisuMZ['SkillsStatesCore'][_0x3622f2(0x1ad)][_0x3622f2(0x334)]['ColorNeutral'];}}}},ColorManager[_0x5851fa(0x211)]=function(){const _0x2a7f63=_0x5851fa,_0x284ef4='_stored_buffColor';this['_colorCache']=this[_0x2a7f63(0x3fa)]||{};if(this[_0x2a7f63(0x3fa)][_0x284ef4])return this['_colorCache'][_0x284ef4];const _0x2a01fb=VisuMZ[_0x2a7f63(0x316)]['Settings'][_0x2a7f63(0x449)][_0x2a7f63(0x40a)];return this[_0x2a7f63(0x2de)](_0x284ef4,_0x2a01fb);},ColorManager[_0x5851fa(0x25b)]=function(){const _0x173ea6=_0x5851fa,_0x47df6b=_0x173ea6(0x1ac);this['_colorCache']=this[_0x173ea6(0x3fa)]||{};if(this[_0x173ea6(0x3fa)][_0x47df6b])return this[_0x173ea6(0x3fa)][_0x47df6b];const _0x21ee8e=VisuMZ[_0x173ea6(0x316)]['Settings'][_0x173ea6(0x449)]['ColorDebuff'];return this[_0x173ea6(0x2de)](_0x47df6b,_0x21ee8e);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x14f)]=BattleManager[_0x5851fa(0x15c)],BattleManager[_0x5851fa(0x15c)]=function(){const _0x284031=_0x5851fa;this[_0x284031(0x22a)](),VisuMZ['SkillsStatesCore'][_0x284031(0x14f)][_0x284031(0x1c1)](this);},BattleManager['updateStatesActionEnd']=function(){const _0xd0c3a=_0x5851fa,_0x5d2074=VisuMZ[_0xd0c3a(0x316)][_0xd0c3a(0x1ad)][_0xd0c3a(0x334)];if(!_0x5d2074)return;if(_0x5d2074[_0xd0c3a(0x2ed)]===![])return;if(!this[_0xd0c3a(0x26d)])return;this[_0xd0c3a(0x26d)][_0xd0c3a(0x22a)]();},Game_Battler['prototype'][_0x5851fa(0x22a)]=function(){const _0x4e50d0=_0x5851fa;if(BattleManager[_0x4e50d0(0x317)]!==_0x4e50d0(0x42d))return;if(this[_0x4e50d0(0x3ed)]===Graphics[_0x4e50d0(0x20a)])return;this[_0x4e50d0(0x3ed)]=Graphics[_0x4e50d0(0x20a)];for(const _0x3af725 of this[_0x4e50d0(0x32e)]){const _0x198941=$dataStates[_0x3af725];if(!_0x198941)continue;if(_0x198941[_0x4e50d0(0x1cd)]!==0x1)continue;this[_0x4e50d0(0x3f5)][_0x3af725]>0x0&&this[_0x4e50d0(0x3f5)][_0x3af725]--;}this[_0x4e50d0(0x31d)](0x1);},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x2f8)]=function(){const _0x2847c2=_0x5851fa,_0x3205e8=VisuMZ[_0x2847c2(0x316)][_0x2847c2(0x1ad)][_0x2847c2(0x334)];for(const _0x180362 of this[_0x2847c2(0x32e)]){if(_0x2847c2(0x3f7)!==_0x2847c2(0x3f7))this[_0x2847c2(0x2a9)](_0x177cfd['id']);else{const _0x4fc3d2=$dataStates[_0x180362];if(_0x3205e8&&_0x3205e8['ActionEndUpdate']!==![]){if(_0x4fc3d2&&_0x4fc3d2['autoRemovalTiming']===0x1)continue;}this[_0x2847c2(0x3f5)][_0x180362]>0x0&&(_0x2847c2(0x229)!=='pmDeU'?this[_0x2847c2(0x3f5)][_0x180362]--:(_0x5c6806=_0x1ea787(_0x5a3471['$1']),_0x23a629=_0x3379ce(_0x3cad57['$2'])));}}},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x1e7)]=Game_Action[_0x5851fa(0x2da)][_0x5851fa(0x185)],Game_Action[_0x5851fa(0x2da)][_0x5851fa(0x185)]=function(_0x5119be){const _0x263dee=_0x5851fa;VisuMZ['SkillsStatesCore'][_0x263dee(0x1e7)][_0x263dee(0x1c1)](this,_0x5119be),this[_0x263dee(0x201)](_0x5119be);},Game_Action[_0x5851fa(0x2da)][_0x5851fa(0x201)]=function(_0x1591e2){const _0x5ba603=_0x5851fa;this[_0x5ba603(0x37e)](_0x1591e2),this[_0x5ba603(0x24d)](_0x1591e2),this[_0x5ba603(0x43e)](_0x1591e2),this[_0x5ba603(0x36c)](_0x1591e2);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x24e)]=Game_Action[_0x5851fa(0x2da)][_0x5851fa(0x332)],Game_Action['prototype'][_0x5851fa(0x332)]=function(_0x4b8649){const _0x57b4bd=_0x5851fa;if(this[_0x57b4bd(0x2b1)](_0x4b8649))return!![];return VisuMZ[_0x57b4bd(0x316)][_0x57b4bd(0x24e)][_0x57b4bd(0x1c1)](this,_0x4b8649);},Game_Action[_0x5851fa(0x2da)][_0x5851fa(0x2b1)]=function(_0x2aab2d){const _0x3762c4=_0x5851fa,_0x7726e2=this[_0x3762c4(0x1c9)]()[_0x3762c4(0x433)];if(_0x7726e2[_0x3762c4(0x2cc)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x4f1b4b=String(RegExp['$1']);if(_0x2aab2d[_0x3762c4(0x3ff)](_0x4f1b4b))return!![];}if(_0x7726e2[_0x3762c4(0x2cc)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){if('rLrDR'!==_0x3762c4(0x14d)){const _0x2bad7d=Number(RegExp['$1']);if(_0x2aab2d['isStateAffected'](_0x2bad7d))return!![];}else this[_0x3762c4(0x39f)](_0x4c7fe6);}else{if(_0x7726e2[_0x3762c4(0x2cc)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x3ecc2c=DataManager[_0x3762c4(0x3e9)](RegExp['$1']);if(_0x2aab2d[_0x3762c4(0x2e6)](_0x3ecc2c))return!![];}}return![];},Game_Action[_0x5851fa(0x2da)][_0x5851fa(0x37e)]=function(_0x36117d){const _0x323b17=_0x5851fa;if(_0x36117d[_0x323b17(0x44e)]()[_0x323b17(0x27d)]<=0x0)return;const _0x52fd40=this[_0x323b17(0x1c9)]()[_0x323b17(0x433)];{const _0x369571=_0x52fd40['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x369571)for(const _0x1ee86a of _0x369571){if(_0x323b17(0x30c)!==_0x323b17(0x30c)){const _0x343f34=this['itemLineRect'](_0x31e97c),_0x37aab0=this['commandName'](_0x2961a2),_0xf33056=this[_0x323b17(0x1f9)](_0x37aab0)[_0x323b17(0x3cf)];this[_0x323b17(0x2e5)](this['isCommandEnabled'](_0x457547));const _0x3ae612=this[_0x323b17(0x452)]();if(_0x3ae612===_0x323b17(0x349))this['drawTextEx'](_0x37aab0,_0x343f34['x']+_0x343f34['width']-_0xf33056,_0x343f34['y'],_0xf33056);else{if(_0x3ae612===_0x323b17(0x361)){const _0x314e97=_0x343f34['x']+_0x52654d['floor']((_0x343f34[_0x323b17(0x3cf)]-_0xf33056)/0x2);this[_0x323b17(0x351)](_0x37aab0,_0x314e97,_0x343f34['y'],_0xf33056);}else this[_0x323b17(0x351)](_0x37aab0,_0x343f34['x'],_0x343f34['y'],_0xf33056);}}else{_0x1ee86a[_0x323b17(0x2cc)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x24fcc1=String(RegExp['$1']);_0x36117d['removeStatesByCategoryAll'](_0x24fcc1);}}}{const _0x25729f=_0x52fd40['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x25729f)for(const _0x3fb069 of _0x25729f){if(_0x323b17(0x314)!=='mnrQh'){_0x3fb069[_0x323b17(0x2cc)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x3bb1b4=String(RegExp['$1']),_0x33d160=Number(RegExp['$2']);_0x36117d[_0x323b17(0x1b3)](_0x3bb1b4,_0x33d160);}else _0x2ef417['push'](_0x2752df(_0x11d32a));}}},Game_Action['prototype'][_0x5851fa(0x24d)]=function(_0x12e391){const _0x1a6e7e=_0x5851fa,_0x47fff9=this['item']()[_0x1a6e7e(0x433)],_0x4d9059=_0x47fff9[_0x1a6e7e(0x2cc)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x4d9059)for(const _0x4d2b4b of _0x4d9059){if(_0x1a6e7e(0x2fb)==='MyCpT'){let _0x2436f7=0x0,_0x51c503=0x0;if(_0x4d2b4b['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x2436f7=Number(RegExp['$1']),_0x51c503=Number(RegExp['$2']);else _0x4d2b4b[_0x1a6e7e(0x2cc)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x2436f7=DataManager[_0x1a6e7e(0x3e9)](RegExp['$1']),_0x51c503=Number(RegExp['$2']));_0x12e391[_0x1a6e7e(0x278)](_0x2436f7,_0x51c503),this[_0x1a6e7e(0x3ef)](_0x12e391);}else _0x5f4d73[_0x1a6e7e(0x316)][_0x1a6e7e(0x3be)][_0x1a6e7e(0x1c1)](this),this['updateTurnDisplaySprite']();}const _0xacf61d=_0x47fff9['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0xacf61d){if(_0x1a6e7e(0x2c5)===_0x1a6e7e(0x2c5))for(const _0x5b8e83 of _0xacf61d){let _0xa50661=0x0,_0x22a372=0x0;if(_0x5b8e83[_0x1a6e7e(0x2cc)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0xa50661=Number(RegExp['$1']),_0x22a372=Number(RegExp['$2']);else{if(_0x5b8e83[_0x1a6e7e(0x2cc)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x1a6e7e(0x1dc)!==_0x1a6e7e(0x1dc))return _0x2583df=_0xd271da(_0x340944),this[_0x1a6e7e(0x3fa)]=this[_0x1a6e7e(0x3fa)]||{},_0x181163[_0x1a6e7e(0x2cc)](/#(.*)/i)?this[_0x1a6e7e(0x3fa)][_0x458272]=_0x1a6e7e(0x252)[_0x1a6e7e(0x33f)](_0x3bc8f5(_0x4f5ded['$1'])):this[_0x1a6e7e(0x3fa)][_0x500a12]=this['textColor'](_0x1bc35a(_0x33311f)),this['_colorCache'][_0xc66109];else _0xa50661=DataManager[_0x1a6e7e(0x3e9)](RegExp['$1']),_0x22a372=Number(RegExp['$2']);}}_0x12e391[_0x1a6e7e(0x275)](_0xa50661,_0x22a372),this['makeSuccess'](_0x12e391);}else{const _0x157bea=_0x260046[_0x1a6e7e(0x385)][_0x1a6e7e(0x1c1)](this,_0x2b0093);if(!_0x43a53a['CanPayJS']['call'](this,_0x127e8a,_0x157bea))return![];}}},Game_Action[_0x5851fa(0x2da)][_0x5851fa(0x43e)]=function(_0x1fa3f5){const _0x4052bf=_0x5851fa,_0xab2c09=[_0x4052bf(0x3b2),'MAXMP',_0x4052bf(0x209),_0x4052bf(0x395),'MAT','MDF',_0x4052bf(0x445),_0x4052bf(0x296)],_0x265c36=this['item']()[_0x4052bf(0x433)],_0x1630f8=_0x265c36['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x1630f8)for(const _0x270dde of _0x1630f8){_0x270dde[_0x4052bf(0x2cc)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x3403e1=_0xab2c09['indexOf'](String(RegExp['$1'])[_0x4052bf(0x42c)]()),_0x89235e=Number(RegExp['$2']);_0x3403e1>=0x0&&(_0x1fa3f5[_0x4052bf(0x440)](_0x3403e1,_0x89235e),this['makeSuccess'](_0x1fa3f5));}const _0x3a86ac=_0x265c36[_0x4052bf(0x2cc)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3a86ac)for(const _0x12c0fe of _0x1630f8){if('BnWOP'!==_0x4052bf(0x42f)){if(_0x177447['hasSkill'](_0x1e7a7a))return![];}else{_0x12c0fe[_0x4052bf(0x2cc)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x6563d3=_0xab2c09[_0x4052bf(0x342)](String(RegExp['$1'])[_0x4052bf(0x42c)]()),_0x4dfd2d=Number(RegExp['$2']);_0x6563d3>=0x0&&(_0x1fa3f5['addBuffTurns'](_0x6563d3,_0x4dfd2d),this['makeSuccess'](_0x1fa3f5));}}},Game_Action[_0x5851fa(0x2da)][_0x5851fa(0x36c)]=function(_0x1ed1d9){const _0x200796=_0x5851fa,_0x2de563=[_0x200796(0x3b2),_0x200796(0x3f8),_0x200796(0x209),_0x200796(0x395),_0x200796(0x3ae),_0x200796(0x3ee),'AGI',_0x200796(0x296)],_0x5620af=this[_0x200796(0x1c9)]()[_0x200796(0x433)],_0x4cc857=_0x5620af[_0x200796(0x2cc)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x4cc857){if(_0x200796(0x3ec)!==_0x200796(0x3ec)){if(_0x52f4f0[_0x200796(0x22e)](_0x379c32))return![];}else for(const _0x2d642e of _0x4cc857){_0x2d642e[_0x200796(0x2cc)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x4807c9=_0x2de563[_0x200796(0x342)](String(RegExp['$1'])[_0x200796(0x42c)]()),_0xe54318=Number(RegExp['$2']);_0x4807c9>=0x0&&('pqUjg'===_0x200796(0x26f)?(_0x1ed1d9[_0x200796(0x3d0)](_0x4807c9,_0xe54318),this[_0x200796(0x3ef)](_0x1ed1d9)):(_0x5b6504(_0x200796(0x27e)[_0x200796(0x33f)](_0x394203,_0x4dd487,_0x5309fb)),_0x29053b['exit']()));}}const _0x77bd7a=_0x5620af['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x77bd7a){if(_0x200796(0x3fb)!==_0x200796(0x336))for(const _0xcea72d of _0x4cc857){_0xcea72d[_0x200796(0x2cc)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x5505b6=_0x2de563['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0x1972a3=Number(RegExp['$2']);if(_0x5505b6>=0x0){if('YarvQ'!==_0x200796(0x387))_0x1ed1d9[_0x200796(0x1ab)](_0x5505b6,_0x1972a3),this[_0x200796(0x3ef)](_0x1ed1d9);else{const _0x51b03a=_0x352457(_0x5f0a95['$1']),_0x49e46a=_0x50b79c[_0x200796(0x33f)](_0x51b03a);_0x371ee0[_0x200796(0x316)][_0x200796(0x196)][_0x14e171['id']]=new _0x2c030e('stateId',_0x49e46a);}}}else return _0x4e723f;}},VisuMZ['SkillsStatesCore']['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x37d)],Game_BattlerBase[_0x5851fa(0x2da)]['initMembers']=function(){const _0x15c8d5=_0x5851fa;this[_0x15c8d5(0x243)]={},this[_0x15c8d5(0x318)](),VisuMZ[_0x15c8d5(0x316)][_0x15c8d5(0x3f9)]['call'](this);},Game_BattlerBase[_0x5851fa(0x2da)]['initMembersSkillsStatesCore']=function(){const _0x43b005=_0x5851fa;this[_0x43b005(0x315)]='',this[_0x43b005(0x2fe)]={},this[_0x43b005(0x289)]={},this['_stateOrigin']={};},Game_BattlerBase[_0x5851fa(0x2da)]['checkCacheKey']=function(_0x135ace){const _0x437377=_0x5851fa;return this[_0x437377(0x243)]=this[_0x437377(0x243)]||{},this['_cache'][_0x135ace]!==undefined;},VisuMZ[_0x5851fa(0x316)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x5851fa(0x2da)]['refresh'],Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x2c4)]=function(){const _0x4a22f3=_0x5851fa;this[_0x4a22f3(0x243)]={},VisuMZ[_0x4a22f3(0x316)][_0x4a22f3(0x421)][_0x4a22f3(0x1c1)](this);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x2ad)]=Game_BattlerBase[_0x5851fa(0x2da)]['eraseState'],Game_BattlerBase['prototype'][_0x5851fa(0x1e9)]=function(_0x1abb67){const _0x361327=_0x5851fa;let _0x2cbb78=this[_0x361327(0x2e6)](_0x1abb67);VisuMZ['SkillsStatesCore'][_0x361327(0x2ad)][_0x361327(0x1c1)](this,_0x1abb67);if(_0x2cbb78&&!this[_0x361327(0x2e6)](_0x1abb67))this[_0x361327(0x39c)](_0x1abb67);},Game_BattlerBase[_0x5851fa(0x2da)]['onRemoveState']=function(_0x17169f){const _0xff8a51=_0x5851fa;this[_0xff8a51(0x19d)](_0x17169f),this[_0xff8a51(0x409)](_0x17169f),this[_0xff8a51(0x3ab)](_0x17169f);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x3a2)]=Game_BattlerBase['prototype'][_0x5851fa(0x2c7)],Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x2c7)]=function(_0x130e1c){const _0x3e7047=_0x5851fa,_0x477c=$dataStates[_0x130e1c],_0x839e1c=this[_0x3e7047(0x394)](_0x130e1c),_0x58e2f0=this[_0x3e7047(0x3b5)](_0x477c)[_0x3e7047(0x1c6)]()[_0x3e7047(0x206)]();switch(_0x58e2f0){case _0x3e7047(0x44a):if(_0x839e1c<=0x0)VisuMZ['SkillsStatesCore'][_0x3e7047(0x3a2)]['call'](this,_0x130e1c);break;case _0x3e7047(0x256):VisuMZ[_0x3e7047(0x316)]['Game_BattlerBase_resetStateCounts'][_0x3e7047(0x1c1)](this,_0x130e1c);break;case'greater':VisuMZ[_0x3e7047(0x316)][_0x3e7047(0x3a2)][_0x3e7047(0x1c1)](this,_0x130e1c),this[_0x3e7047(0x3f5)][_0x130e1c]=Math[_0x3e7047(0x3a9)](this[_0x3e7047(0x3f5)][_0x130e1c],_0x839e1c);break;case _0x3e7047(0x362):VisuMZ[_0x3e7047(0x316)][_0x3e7047(0x3a2)][_0x3e7047(0x1c1)](this,_0x130e1c),this[_0x3e7047(0x3f5)][_0x130e1c]+=_0x839e1c;break;default:VisuMZ[_0x3e7047(0x316)][_0x3e7047(0x3a2)][_0x3e7047(0x1c1)](this,_0x130e1c);break;}},Game_BattlerBase['prototype'][_0x5851fa(0x3b5)]=function(_0x42ccc0){const _0x3edfe5=_0x5851fa,_0x1cdfb7=_0x42ccc0[_0x3edfe5(0x433)];return _0x1cdfb7[_0x3edfe5(0x2cc)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ['SkillsStatesCore'][_0x3edfe5(0x1ad)]['States'][_0x3edfe5(0x2c0)];},VisuMZ[_0x5851fa(0x316)]['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase[_0x5851fa(0x2da)]['overwriteBuffTurns'],Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x3f4)]=function(_0x29516f,_0x2e773b){const _0x136757=_0x5851fa,_0x304f2a=VisuMZ[_0x136757(0x316)][_0x136757(0x1ad)]['Buffs'][_0x136757(0x2c0)],_0x362450=this[_0x136757(0x25a)](_0x29516f);switch(_0x304f2a){case _0x136757(0x44a):if(_0x362450<=0x0)this[_0x136757(0x430)][_0x29516f]=_0x2e773b;break;case _0x136757(0x256):this[_0x136757(0x430)][_0x29516f]=_0x2e773b;break;case _0x136757(0x2c9):this[_0x136757(0x430)][_0x29516f]=Math['max'](_0x362450,_0x2e773b);break;case _0x136757(0x362):this['_buffTurns'][_0x29516f]+=_0x2e773b;break;default:VisuMZ[_0x136757(0x316)][_0x136757(0x367)][_0x136757(0x1c1)](this,_0x29516f,_0x2e773b);break;}const _0x12eb48=VisuMZ['SkillsStatesCore'][_0x136757(0x1ad)][_0x136757(0x449)][_0x136757(0x335)];this[_0x136757(0x430)][_0x29516f]=this[_0x136757(0x430)][_0x29516f]['clamp'](0x0,_0x12eb48);},Game_BattlerBase['prototype'][_0x5851fa(0x250)]=function(){const _0x496eec=_0x5851fa;if(this[_0x496eec(0x243)][_0x496eec(0x164)]!==undefined)return this['_cache'][_0x496eec(0x164)];this[_0x496eec(0x243)]['groupDefeat']=![];const _0xe24f1a=this['states']();for(const _0x3223c0 of _0xe24f1a){if(!_0x3223c0)continue;if(_0x3223c0[_0x496eec(0x433)][_0x496eec(0x2cc)](/<GROUP DEFEAT>/i)){if('zJuvF'===_0x496eec(0x1ec))return _0x496eec(0x252)['format'](_0x53d507(_0x20d56a['$1']));else{this[_0x496eec(0x243)][_0x496eec(0x164)]=!![];break;}}}return this[_0x496eec(0x243)][_0x496eec(0x164)];},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x34f)]=Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x34d)],Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x34d)]=function(){const _0x54f5f0=_0x5851fa;if(this[_0x54f5f0(0x1e2)]()!=='')this[_0x54f5f0(0x2dd)]();else{if('DSCLb'!==_0x54f5f0(0x3d4))VisuMZ['SkillsStatesCore'][_0x54f5f0(0x34f)][_0x54f5f0(0x1c1)](this),this[_0x54f5f0(0x318)]();else{if(!_0x290f35[_0x54f5f0(0x22e)](_0x543553))return![];}}},Game_Actor[_0x5851fa(0x2da)][_0x5851fa(0x34d)]=function(){const _0x1339cb=_0x5851fa;this['_stateSteps']=this[_0x1339cb(0x2d7)]||{},Game_Battler['prototype']['clearStates'][_0x1339cb(0x1c1)](this);},Game_BattlerBase[_0x5851fa(0x2da)]['clearStatesWithStateRetain']=function(){const _0x17834e=_0x5851fa,_0x427719=this[_0x17834e(0x44e)]();for(const _0x4803a3 of _0x427719){if(_0x4803a3&&this['canClearState'](_0x4803a3))this[_0x17834e(0x1e9)](_0x4803a3['id']);}this['_cache']={};},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x221)]=function(_0x47a0c2){const _0x5c2bee=_0x5851fa,_0x10c968=this[_0x5c2bee(0x1e2)]();if(_0x10c968!==''){if('EocmH'===_0x5c2bee(0x28c))return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x5c2bee(0x1b0)]():_0x483164['SkillsStatesCore'][_0x5c2bee(0x301)][_0x5c2bee(0x1c1)](this);else{const _0x3f2207=_0x47a0c2[_0x5c2bee(0x433)];if(_0x10c968==='death'&&_0x3f2207[_0x5c2bee(0x2cc)](/<NO DEATH CLEAR>/i))return![];if(_0x10c968==='recover\x20all'&&_0x3f2207[_0x5c2bee(0x2cc)](/<NO RECOVER ALL CLEAR>/i))return![];}}return this[_0x5c2bee(0x2e6)](_0x47a0c2['id']);},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x1e2)]=function(){const _0x274855=_0x5851fa;return this[_0x274855(0x315)];},Game_BattlerBase['prototype'][_0x5851fa(0x2ac)]=function(_0x3457ec){const _0x3c001f=_0x5851fa;this[_0x3c001f(0x315)]=_0x3457ec;},Game_BattlerBase['prototype'][_0x5851fa(0x178)]=function(){const _0x54fb68=_0x5851fa;this[_0x54fb68(0x315)]='';},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x16d)]=Game_BattlerBase['prototype']['die'],Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x283)]=function(){const _0x45c50=_0x5851fa;this[_0x45c50(0x2ac)]('death'),VisuMZ[_0x45c50(0x316)][_0x45c50(0x16d)][_0x45c50(0x1c1)](this),this[_0x45c50(0x178)]();},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x41e)]=Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x28d)],Game_BattlerBase['prototype'][_0x5851fa(0x28d)]=function(){const _0x2cc4e3=_0x5851fa;this['setStateRetainType'](_0x2cc4e3(0x29f)),VisuMZ[_0x2cc4e3(0x316)][_0x2cc4e3(0x41e)][_0x2cc4e3(0x1c1)](this),this[_0x2cc4e3(0x178)]();},Game_BattlerBase['prototype']['canPaySkillCost']=function(_0x4b8007){const _0x4f5474=_0x5851fa;for(settings of VisuMZ['SkillsStatesCore']['Settings'][_0x4f5474(0x241)]){if('hboOI'==='hboOI'){const _0x48e670=settings['CalcJS'][_0x4f5474(0x1c1)](this,_0x4b8007);if(!settings[_0x4f5474(0x3ea)][_0x4f5474(0x1c1)](this,_0x4b8007,_0x48e670))return![];}else{if(!_0x5f4b43['hasSkill'](_0x2e31f2))return!![];}}return!![];},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x24a)]=function(_0x4d90e3){const _0xe0b10=_0x5851fa;for(settings of VisuMZ[_0xe0b10(0x316)][_0xe0b10(0x1ad)][_0xe0b10(0x241)]){const _0x4d6d44=settings['CalcJS'][_0xe0b10(0x1c1)](this,_0x4d90e3);settings[_0xe0b10(0x2ce)][_0xe0b10(0x1c1)](this,_0x4d90e3,_0x4d6d44);}},VisuMZ[_0x5851fa(0x316)]['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x2f0)],Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x2f0)]=function(_0x2d6495){const _0x40214d=_0x5851fa;if(!_0x2d6495)return![];if(!VisuMZ[_0x40214d(0x316)][_0x40214d(0x17b)][_0x40214d(0x1c1)](this,_0x2d6495))return![];if(!this[_0x40214d(0x3ca)](_0x2d6495))return![];if(!this[_0x40214d(0x254)](_0x2d6495))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x2d6495))return![];return!![];},Game_BattlerBase['prototype'][_0x5851fa(0x3ca)]=function(_0x230218){if(!this['checkSkillConditionsSwitchNotetags'](_0x230218))return![];return!![];},Game_BattlerBase['prototype'][_0x5851fa(0x2b2)]=function(_0x3a636a){const _0x1ad3dd=_0x5851fa,_0x38b37e=_0x3a636a[_0x1ad3dd(0x433)];if(_0x38b37e['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1ad3dd(0x3f6)===_0x1ad3dd(0x3f6)){const _0x34e40e=JSON[_0x1ad3dd(0x312)]('['+RegExp['$1'][_0x1ad3dd(0x2cc)](/\d+/g)+']');for(const _0x18b9b1 of _0x34e40e){if(!$gameSwitches[_0x1ad3dd(0x22e)](_0x18b9b1))return![];}return!![];}else{const _0x1fec06=this['_buffs'][_0x9020ac];return _0x1fccf1[_0x1ad3dd(0x316)][_0x1ad3dd(0x1ad)][_0x1ad3dd(0x449)][_0x1ad3dd(0x41d)][_0x1ad3dd(0x1c1)](this,_0x6216de,_0x1fec06);}}if(_0x38b37e[_0x1ad3dd(0x2cc)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1ad3dd(0x1ff)!==_0x1ad3dd(0x1ff))_0x45dcfc[_0x1ad3dd(0x316)][_0x1ad3dd(0x3a0)][_0x1ad3dd(0x1c1)](this);else{const _0xfded=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2d5044 of _0xfded){if(_0x1ad3dd(0x1a9)==='RaxyC'){if(typeof _0x83fb58!==_0x1ad3dd(0x2a7))_0x333b7c=_0x4c239c['id'];const _0x462aa7=this['stateData'](_0x49646e);return _0x462aa7[_0x3ac4c3];}else{if(!$gameSwitches[_0x1ad3dd(0x22e)](_0x2d5044))return![];}}return!![];}}if(_0x38b37e[_0x1ad3dd(0x2cc)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4483e8=JSON[_0x1ad3dd(0x312)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x565508 of _0x4483e8){if($gameSwitches[_0x1ad3dd(0x22e)](_0x565508))return!![];}return![];}if(_0x38b37e['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1ad3dd(0x19a)!=='CGSFL'){const _0x368833=JSON[_0x1ad3dd(0x312)]('['+RegExp['$1'][_0x1ad3dd(0x2cc)](/\d+/g)+']');for(const _0x49d105 of _0x368833){if(!$gameSwitches['value'](_0x49d105))return!![];}return![];}else for(const _0x1f87bf of _0x29d5a2){_0x1f87bf[_0x1ad3dd(0x2cc)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4e7c0b=_0x353798['indexOf'](_0x39d1eb(_0x12e366['$1'])[_0x1ad3dd(0x42c)]()),_0xd353b=_0x2a9862(_0x36317b['$2']);_0x4e7c0b>=0x0&&(_0x1b704e['setBuffTurns'](_0x4e7c0b,_0xd353b),this['makeSuccess'](_0x313ca5));}}if(_0x38b37e['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3c2f9c=JSON[_0x1ad3dd(0x312)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2baf23 of _0x3c2f9c){if(!$gameSwitches[_0x1ad3dd(0x22e)](_0x2baf23))return!![];}return![];}if(_0x38b37e[_0x1ad3dd(0x2cc)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5c4426=JSON[_0x1ad3dd(0x312)]('['+RegExp['$1'][_0x1ad3dd(0x2cc)](/\d+/g)+']');for(const _0x7151a4 of _0x5c4426){if($gameSwitches[_0x1ad3dd(0x22e)](_0x7151a4))return![];}return!![];}return!![];},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x254)]=function(_0x5e564a){const _0x42fa65=_0x5851fa,_0x36564b=_0x5e564a['note'],_0x43d85b=VisuMZ['SkillsStatesCore'][_0x42fa65(0x41f)];return _0x43d85b[_0x5e564a['id']]?_0x43d85b[_0x5e564a['id']][_0x42fa65(0x1c1)](this,_0x5e564a):'vkbpI'!==_0x42fa65(0x372)?!![]:this[_0x42fa65(0x212)]();},Game_BattlerBase['prototype']['meetsSkillConditionsGlobalJS']=function(_0x58ff4c){const _0x34a0a4=_0x5851fa;return VisuMZ[_0x34a0a4(0x316)][_0x34a0a4(0x1ad)][_0x34a0a4(0x26b)]['SkillConditionJS'][_0x34a0a4(0x1c1)](this,_0x58ff4c);},VisuMZ[_0x5851fa(0x316)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x1c8)],Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x1c8)]=function(_0xf0c09f){const _0x552a88=_0x5851fa;for(settings of VisuMZ[_0x552a88(0x316)][_0x552a88(0x1ad)][_0x552a88(0x241)]){if(settings[_0x552a88(0x21e)]['toUpperCase']()==='MP')return settings[_0x552a88(0x385)][_0x552a88(0x1c1)](this,_0xf0c09f);}return VisuMZ[_0x552a88(0x316)][_0x552a88(0x29d)][_0x552a88(0x1c1)](this,_0xf0c09f);},VisuMZ[_0x5851fa(0x316)]['Game_BattlerBase_skillTpCost']=Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x19c)],Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x19c)]=function(_0x141664){const _0x217bc8=_0x5851fa;for(settings of VisuMZ[_0x217bc8(0x316)][_0x217bc8(0x1ad)][_0x217bc8(0x241)]){if(settings['Name'][_0x217bc8(0x42c)]()==='TP')return settings[_0x217bc8(0x385)][_0x217bc8(0x1c1)](this,_0x141664);}return VisuMZ[_0x217bc8(0x316)]['Game_BattlerBase_skillTpCost'][_0x217bc8(0x1c1)](this,_0x141664);},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x2af)]=function(_0xe8e11){const _0x2ca5bf=_0x5851fa;if(typeof _0xe8e11===_0x2ca5bf(0x2a7))_0xe8e11=$dataStates[_0xe8e11];return this[_0x2ca5bf(0x44e)]()[_0x2ca5bf(0x25f)](_0xe8e11);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x3da)]=Game_BattlerBase['prototype']['states'],Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x44e)]=function(){const _0x5c75e2=_0x5851fa;let _0x1bed4c=VisuMZ[_0x5c75e2(0x316)][_0x5c75e2(0x3da)][_0x5c75e2(0x1c1)](this);if($gameTemp[_0x5c75e2(0x1f2)])return _0x1bed4c;return $gameTemp[_0x5c75e2(0x1f2)]=!![],this[_0x5c75e2(0x359)](_0x1bed4c),$gameTemp['_checkingPassiveStates']=undefined,_0x1bed4c;},Game_BattlerBase[_0x5851fa(0x2da)]['addPassiveStates']=function(_0xda495f){const _0x13097b=_0x5851fa,_0x3eaf74=this[_0x13097b(0x1fb)]();for(state of _0x3eaf74){if(!state)continue;if(!this[_0x13097b(0x15b)](state)&&_0xda495f['includes'](state))continue;_0xda495f['push'](state);}_0x3eaf74[_0x13097b(0x27d)]>0x0&&_0xda495f[_0x13097b(0x435)]((_0x21b824,_0x1a97ec)=>{const _0x5aa64b=_0x13097b;if(_0x5aa64b(0x1f3)!=='YuGGl'){const _0x8594b3=_0x21b824[_0x5aa64b(0x29b)],_0x518282=_0x1a97ec[_0x5aa64b(0x29b)];if(_0x8594b3!==_0x518282){if(_0x5aa64b(0x205)===_0x5aa64b(0x205))return _0x518282-_0x8594b3;else{const _0x3914d2=_0x19fbf0[_0x5aa64b(0x312)]('['+_0x210da4['$1'][_0x5aa64b(0x2cc)](/\d+/g)+']');for(const _0x51c4ff of _0x3914d2){if(!_0x3c94f8[_0x5aa64b(0x22e)](_0x51c4ff))return![];}return!![];}}return _0x21b824-_0x1a97ec;}else return _0x5aa64b(0x19b);});},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x15b)]=function(_0x4ad2d1){const _0x7a45a3=_0x5851fa;return _0x4ad2d1[_0x7a45a3(0x433)][_0x7a45a3(0x2cc)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x1ca)]=Game_BattlerBase[_0x5851fa(0x2da)]['traitsSet'],Game_BattlerBase['prototype'][_0x5851fa(0x3c4)]=function(_0x3215fc){const _0x4a5c51=_0x5851fa;this[_0x4a5c51(0x23b)]=!![];let _0x1af4e6=VisuMZ[_0x4a5c51(0x316)][_0x4a5c51(0x1ca)][_0x4a5c51(0x1c1)](this,_0x3215fc);return this[_0x4a5c51(0x23b)]=undefined,_0x1af4e6;},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x3b9)]=function(){const _0x1a399f=_0x5851fa;let _0x21489b=[];this[_0x1a399f(0x1db)]=this[_0x1a399f(0x1db)]||{};for(;;){_0x21489b=[];let _0x29ca06=!![];for(const _0x3880ab of this['_cache'][_0x1a399f(0x1fb)]){const _0xf79447=$dataStates[_0x3880ab];if(!_0xf79447)continue;let _0x25d9bd=this[_0x1a399f(0x3dc)](_0xf79447);if(this[_0x1a399f(0x1db)][_0x3880ab]!==_0x25d9bd){if('fihDl'!==_0x1a399f(0x2ff)){this['_stateMaxTurns']=this[_0x1a399f(0x418)]||{};if(this[_0x1a399f(0x418)][_0x4debc5])return this[_0x1a399f(0x418)][_0x36ee99];return _0x3da819[_0x4135f0][_0x1a399f(0x433)]['match'](/<MAX TURNS:[ ](\d+)>/i)?this['_stateMaxTurns'][_0x5b235e]=_0x230b1e(_0x21e1db['$1']):this[_0x1a399f(0x418)][_0x5e7c58]=_0x2ea5c8[_0x1a399f(0x316)][_0x1a399f(0x1ad)][_0x1a399f(0x334)][_0x1a399f(0x335)],this['_stateMaxTurns'][_0x4066c3];}else _0x29ca06=![],this['_passiveStateResults'][_0x3880ab]=_0x25d9bd;}if(!_0x25d9bd)continue;_0x21489b[_0x1a399f(0x309)](_0xf79447);}if(_0x29ca06){if('RfqWx'===_0x1a399f(0x269))break;else _0x3f2494['push'](_0x4169fd[_0x1a399f(0x1ba)](_0x2dbe9c));}else{if(!this[_0x1a399f(0x23b)])this[_0x1a399f(0x2c4)]();this[_0x1a399f(0x379)]();}}return _0x21489b;},Game_BattlerBase['prototype'][_0x5851fa(0x3dc)]=function(_0x4e460f){const _0x50c9a5=_0x5851fa;if(!this[_0x50c9a5(0x31f)](_0x4e460f))return![];if(!this[_0x50c9a5(0x15e)](_0x4e460f))return![];if(!this['meetsPassiveStateConditionJS'](_0x4e460f))return![];if(!this[_0x50c9a5(0x170)](_0x4e460f))return![];return!![];},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x31f)]=function(_0xcdc8d4){return!![];},Game_Actor[_0x5851fa(0x2da)]['meetsPassiveStateConditionClasses']=function(_0x14c60a){const _0x1e0718=_0x5851fa,_0x10294f=_0x14c60a[_0x1e0718(0x433)];if(_0x10294f[_0x1e0718(0x2cc)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x2d0a13=String(RegExp['$1'])[_0x1e0718(0x388)](',')['map'](_0x7e4d76=>_0x7e4d76[_0x1e0718(0x206)]()),_0x27f924=VisuMZ[_0x1e0718(0x316)][_0x1e0718(0x319)](_0x2d0a13);return _0x27f924[_0x1e0718(0x25f)](this[_0x1e0718(0x188)]());}if(_0x10294f[_0x1e0718(0x2cc)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if('ROeBo'==='UVXun'){const _0x46ec64=this[_0x1e0718(0x438)](_0x1627f7);this[_0x1e0718(0x15a)](_0x46ec64,_0x1e0718(0x3a8),!![],_0x582b0a);}else{const _0x48224f=String(RegExp['$1'])['split'](',')[_0x1e0718(0x195)](_0x39a652=>_0x39a652[_0x1e0718(0x206)]()),_0x572be4=VisuMZ[_0x1e0718(0x316)]['ParseClassIDs'](_0x48224f);let _0x2b9e58=[this[_0x1e0718(0x188)]()];if(Imported[_0x1e0718(0x1d9)]&&this[_0x1e0718(0x1d5)]){if('FYJlE'===_0x1e0718(0x3a5))_0x2b9e58=this[_0x1e0718(0x1d5)]();else{const _0x499ee4=this[_0x1e0718(0x375)](),_0x52d67c=_0x4757bd[_0x1e0718(0x3a4)]((_0xb0e7a1-0x2)*_0x499ee4),_0x39c642=_0x4425d6-0x2,_0x300f85=this[_0x1e0718(0x3c1)]();this[_0x1e0718(0x159)]['fillRect'](_0x1565c6,_0x229cb3,_0x29510a,_0x59fe83,_0x300f85),this['bitmap']['gradientFillRect'](_0x2d655f+0x1,_0x2991c4+0x1,_0x52d67c,_0x39c642,_0x36b55a,_0x3c60be);}}return _0x572be4[_0x1e0718(0x2a5)](_0x2bfcb5=>_0x2b9e58['includes'](_0x2bfcb5))[_0x1e0718(0x27d)]>0x0;}}return Game_BattlerBase[_0x1e0718(0x2da)][_0x1e0718(0x31f)][_0x1e0718(0x1c1)](this,_0x14c60a);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x319)]=function(_0x495ed7){const _0x1083db=_0x5851fa,_0x47e3bd=[];for(let _0x985b7c of _0x495ed7){_0x985b7c=(String(_0x985b7c)||'')[_0x1083db(0x206)]();const _0x11d4c5=/^\d+$/[_0x1083db(0x245)](_0x985b7c);if(_0x11d4c5){if(_0x1083db(0x42b)!==_0x1083db(0x42b)){if(!this[_0x1083db(0x2cf)])return;const _0x31c51a=this[_0x1083db(0x2cf)][_0x1083db(0x162)]();for(const _0x550517 of _0x31c51a){const _0x1dba9b=this[_0x1083db(0x438)](_0x550517);this[_0x1083db(0x15a)](_0x1dba9b,'skill',!![],_0x550517);}}else _0x47e3bd[_0x1083db(0x309)](Number(_0x985b7c));}else _0x47e3bd[_0x1083db(0x309)](DataManager['getClassIdWithName'](_0x985b7c));}return _0x47e3bd[_0x1083db(0x195)](_0x1312ab=>$dataClasses[Number(_0x1312ab)])['remove'](null);},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x15e)]=function(_0x305911){const _0xcd6cb9=_0x5851fa,_0x51261a=_0x305911[_0xcd6cb9(0x433)];if(_0x51261a['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xcd6cb9(0x1f8)!==_0xcd6cb9(0x1f8))_0x6c86ed[_0xcd6cb9(0x316)][_0xcd6cb9(0x27f)]['call'](this),this['process_VisuMZ_SkillsStatesCore_Notetags'](),_0x320f92[_0xcd6cb9(0x316)]['CheckIncompatibleStates']();else{const _0x1a2a62=JSON['parse']('['+RegExp['$1'][_0xcd6cb9(0x2cc)](/\d+/g)+']');for(const _0x9e7786 of _0x1a2a62){if(!$gameSwitches[_0xcd6cb9(0x22e)](_0x9e7786))return![];}return!![];}}if(_0x51261a['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xcd6cb9(0x2c3)===_0xcd6cb9(0x183))for(const _0x2b52fa of _0x2173f7){_0x2b52fa[_0xcd6cb9(0x2cc)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x269120=_0x2df785[_0xcd6cb9(0x342)](_0x222cf3(_0x2d219a['$1'])[_0xcd6cb9(0x42c)]()),_0x205a16=_0x5eded3(_0x4c1dce['$2']);_0x269120>=0x0&&(_0x1f54e3['setDebuffTurns'](_0x269120,_0x205a16),this[_0xcd6cb9(0x3ef)](_0x13510f));}else{const _0xc62d79=JSON[_0xcd6cb9(0x312)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x158e27 of _0xc62d79){if(!$gameSwitches[_0xcd6cb9(0x22e)](_0x158e27))return![];}return!![];}}if(_0x51261a['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x51db3d=JSON[_0xcd6cb9(0x312)]('['+RegExp['$1'][_0xcd6cb9(0x2cc)](/\d+/g)+']');for(const _0x1a7985 of _0x51db3d){if(_0xcd6cb9(0x2b3)===_0xcd6cb9(0x2b3)){if($gameSwitches['value'](_0x1a7985))return!![];}else{const _0x1be7b9=_0x5614b8[_0xcd6cb9(0x316)][_0xcd6cb9(0x1ad)][_0xcd6cb9(0x449)][_0xcd6cb9(0x335)];this[_0xcd6cb9(0x430)][_0x2ae924]=_0x41d150['clamp'](0x0,_0x1be7b9);}}return![];}if(_0x51261a[_0xcd6cb9(0x2cc)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4629b6=JSON[_0xcd6cb9(0x312)]('['+RegExp['$1'][_0xcd6cb9(0x2cc)](/\d+/g)+']');for(const _0x1a21ce of _0x4629b6){if('HRBUY'===_0xcd6cb9(0x34b))return this[_0xcd6cb9(0x2ec)]();else{if(!$gameSwitches['value'](_0x1a21ce))return!![];}}return![];}if(_0x51261a[_0xcd6cb9(0x2cc)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xcd6cb9(0x1b4)===_0xcd6cb9(0x2a4)){this[_0xcd6cb9(0x381)]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x3fefed['id']])return this[_0xcd6cb9(0x381)][_0x457c90['id']];this[_0xcd6cb9(0x381)][_0x1dc630['id']]=[_0x4e3256['stypeId']];if(_0x4b0b24[_0xcd6cb9(0x433)][_0xcd6cb9(0x2cc)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1d7f35=_0x35448c['parse']('['+_0xdd7962['$1'][_0xcd6cb9(0x2cc)](/\d+/g)+']');this[_0xcd6cb9(0x381)][_0x3f58a8['id']]=this['_stypeIDs'][_0x4aa588['id']]['concat'](_0x1d7f35);}else{if(_0x5e2aa6['note'][_0xcd6cb9(0x2cc)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x16f172=_0x2246eb['$1'][_0xcd6cb9(0x388)](',');for(const _0x4232e8 of _0x16f172){const _0x17e7cc=_0x2bf200[_0xcd6cb9(0x43a)](_0x4232e8);if(_0x17e7cc)this[_0xcd6cb9(0x381)][_0x4e3935['id']][_0xcd6cb9(0x309)](_0x17e7cc);}}}return this['_stypeIDs'][_0x11aa51['id']];}else{const _0x230d51=JSON[_0xcd6cb9(0x312)]('['+RegExp['$1'][_0xcd6cb9(0x2cc)](/\d+/g)+']');for(const _0x481407 of _0x230d51){if(!$gameSwitches[_0xcd6cb9(0x22e)](_0x481407))return!![];}return![];}}if(_0x51261a[_0xcd6cb9(0x2cc)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2b1fcd=JSON[_0xcd6cb9(0x312)]('['+RegExp['$1'][_0xcd6cb9(0x2cc)](/\d+/g)+']');for(const _0x110603 of _0x2b1fcd){if($gameSwitches[_0xcd6cb9(0x22e)](_0x110603))return![];}return!![];}return!![];},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x447)]=function(_0x4eab22){const _0x4571bd=_0x5851fa,_0x3076a3=VisuMZ['SkillsStatesCore'][_0x4571bd(0x1e1)];if(_0x3076a3[_0x4eab22['id']]&&!_0x3076a3[_0x4eab22['id']]['call'](this,_0x4eab22))return![];return!![];},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x170)]=function(_0x63e3f){const _0x20cec6=_0x5851fa;return VisuMZ[_0x20cec6(0x316)]['Settings'][_0x20cec6(0x380)][_0x20cec6(0x2d4)]['call'](this,_0x63e3f);},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x1fb)]=function(){const _0x4497f6=_0x5851fa;if(this['checkCacheKey'](_0x4497f6(0x1fb)))return this[_0x4497f6(0x3b9)]();if(this[_0x4497f6(0x1c0)])return[];return this[_0x4497f6(0x1c0)]=!![],this[_0x4497f6(0x379)](),this['_checkingVisuMzPassiveStateObjects']=undefined,this[_0x4497f6(0x3b9)]();},Game_BattlerBase[_0x5851fa(0x2da)]['createPassiveStatesCache']=function(){const _0x16afce=_0x5851fa;this['_checkingVisuMzPassiveStateObjects']=!![],this['_cache'][_0x16afce(0x1fb)]=[],this[_0x16afce(0x3d6)](),this['addPassiveStatesByNotetag'](),this[_0x16afce(0x410)](),this[_0x16afce(0x1c0)]=undefined;},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x3d6)]=function(){const _0xe536db=_0x5851fa;if(Imported['VisuMZ_1_ElementStatusCore'])this[_0xe536db(0x169)]();},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x41c)]=function(){return[];},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x17a)]=function(){const _0x2b997d=_0x5851fa,_0x49c02b=this[_0x2b997d(0x41c)]();for(const _0x316b77 of _0x49c02b){if(!_0x316b77)continue;const _0x182391=_0x316b77[_0x2b997d(0x433)][_0x2b997d(0x2cc)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x182391)for(const _0x5443ca of _0x182391){_0x5443ca[_0x2b997d(0x2cc)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x52d965=RegExp['$1'];if(_0x52d965[_0x2b997d(0x2cc)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x3dc32d=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x2b997d(0x243)][_0x2b997d(0x1fb)]=this[_0x2b997d(0x243)][_0x2b997d(0x1fb)][_0x2b997d(0x3af)](_0x3dc32d);}else{const _0x3fa7b9=_0x52d965['split'](',');for(const _0x1e88a9 of _0x3fa7b9){if(_0x2b997d(0x350)!==_0x2b997d(0x350))return _0x3761b4[_0x2b997d(0x316)][_0x2b997d(0x1ad)][_0x2b997d(0x26b)]['SkillMenuStatusRect'][_0x2b997d(0x1c1)](this);else{const _0xe760e6=DataManager['getStateIdWithName'](_0x1e88a9);if(_0xe760e6)this['_cache'][_0x2b997d(0x1fb)]['push'](_0xe760e6);}}}}}},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x410)]=function(){const _0x3c703a=_0x5851fa,_0x3f7c68=VisuMZ[_0x3c703a(0x316)]['Settings'][_0x3c703a(0x380)][_0x3c703a(0x31a)];this[_0x3c703a(0x243)]['passiveStates']=this[_0x3c703a(0x243)][_0x3c703a(0x1fb)]['concat'](_0x3f7c68);},Game_BattlerBase[_0x5851fa(0x2da)]['stateTurns']=function(_0x11c8af){const _0x50b7c5=_0x5851fa;if(typeof _0x11c8af!==_0x50b7c5(0x2a7))_0x11c8af=_0x11c8af['id'];return this[_0x50b7c5(0x3f5)][_0x11c8af]||0x0;},Game_BattlerBase[_0x5851fa(0x2da)]['setStateTurns']=function(_0x5b950d,_0x5b67d0){const _0x394d49=_0x5851fa;if(typeof _0x5b950d!==_0x394d49(0x2a7))_0x5b950d=_0x5b950d['id'];if(this['isStateAffected'](_0x5b950d)){if(_0x394d49(0x14c)===_0x394d49(0x34e)){_0x14b3c1[_0x394d49(0x2cc)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x399991=_0x372e5e['$1'];if(_0x399991[_0x394d49(0x2cc)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x329ba8=_0x391b71[_0x394d49(0x312)]('['+_0x413a74['$1']['match'](/\d+/g)+']');this['_cache'][_0x394d49(0x1fb)]=this[_0x394d49(0x243)]['passiveStates'][_0x394d49(0x3af)](_0x329ba8);}else{const _0x42eadf=_0x399991['split'](',');for(const _0x595d86 of _0x42eadf){const _0x3de8b7=_0x1640d4[_0x394d49(0x3e9)](_0x595d86);if(_0x3de8b7)this[_0x394d49(0x243)]['passiveStates']['push'](_0x3de8b7);}}}else{const _0x450976=DataManager[_0x394d49(0x233)](_0x5b950d);this['_stateTurns'][_0x5b950d]=_0x5b67d0['clamp'](0x0,_0x450976);if(this[_0x394d49(0x3f5)][_0x5b950d]<=0x0)this[_0x394d49(0x1ea)](_0x5b950d);}}},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x275)]=function(_0x3dfca7,_0x45afb9){const _0x2339fc=_0x5851fa;if(typeof _0x3dfca7!==_0x2339fc(0x2a7))_0x3dfca7=_0x3dfca7['id'];if(this[_0x2339fc(0x2e6)](_0x3dfca7)){if(_0x2339fc(0x18e)!=='nUIHi')_0x45afb9+=this[_0x2339fc(0x394)](_0x3dfca7),this[_0x2339fc(0x278)](_0x3dfca7,_0x45afb9);else{this[_0x2339fc(0x324)]=this[_0x2339fc(0x324)]||{};const _0x245c6e=_0x4d8dc1?this[_0x2339fc(0x369)](_0x181e2f):this[_0x2339fc(0x20f)]();this[_0x2339fc(0x324)][_0x4d58ab]=_0x245c6e;}}},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x1a8)]=Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x337)],Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x337)]=function(_0x40dc32){const _0x5e0775=_0x5851fa,_0x5089a7=this[_0x5e0775(0x238)][_0x40dc32];VisuMZ[_0x5e0775(0x316)][_0x5e0775(0x1a8)]['call'](this,_0x40dc32);if(_0x5089a7>0x0)this['onEraseBuff'](_0x40dc32);if(_0x5089a7<0x0)this['onEraseDebuff'](_0x40dc32);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x1b1)]=Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x3e5)],Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x3e5)]=function(_0x46fb39){const _0x532862=_0x5851fa;VisuMZ[_0x532862(0x316)]['Game_BattlerBase_increaseBuff'][_0x532862(0x1c1)](this,_0x46fb39);if(!this[_0x532862(0x352)](_0x46fb39))this[_0x532862(0x337)](_0x46fb39);},VisuMZ['SkillsStatesCore'][_0x5851fa(0x198)]=Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x1bf)],Game_BattlerBase['prototype']['decreaseBuff']=function(_0x5267d5){const _0x1d7686=_0x5851fa;VisuMZ['SkillsStatesCore'][_0x1d7686(0x198)][_0x1d7686(0x1c1)](this,_0x5267d5);if(!this[_0x1d7686(0x352)](_0x5267d5))this['eraseBuff'](_0x5267d5);},Game_BattlerBase['prototype'][_0x5851fa(0x2f9)]=function(_0x4c19c3){},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x306)]=function(_0x1dbba5){},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x36b)]=function(_0x2fc0ff){const _0x1867ef=_0x5851fa;return this['_buffs'][_0x2fc0ff]===VisuMZ[_0x1867ef(0x316)]['Settings'][_0x1867ef(0x449)][_0x1867ef(0x2d8)];},Game_BattlerBase['prototype'][_0x5851fa(0x1b9)]=function(_0x5026b3){const _0x439059=_0x5851fa;return this[_0x439059(0x238)][_0x5026b3]===-VisuMZ['SkillsStatesCore'][_0x439059(0x1ad)][_0x439059(0x449)]['StackDebuffMax'];},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x429)]=Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x2f5)],Game_BattlerBase['prototype']['buffIconIndex']=function(_0x1c9144,_0x139bf8){const _0x2ec0da=_0x5851fa;return _0x1c9144=_0x1c9144[_0x2ec0da(0x2e7)](-0x2,0x2),VisuMZ[_0x2ec0da(0x316)][_0x2ec0da(0x429)][_0x2ec0da(0x1c1)](this,_0x1c9144,_0x139bf8);},Game_BattlerBase['prototype']['paramBuffRate']=function(_0x17bb96){const _0x27dd11=_0x5851fa,_0x5e4485=this[_0x27dd11(0x238)][_0x17bb96];return VisuMZ['SkillsStatesCore']['Settings'][_0x27dd11(0x449)]['MultiplierJS'][_0x27dd11(0x1c1)](this,_0x17bb96,_0x5e4485);},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x25a)]=function(_0x27c33c){const _0x4bb9d6=_0x5851fa;return this[_0x4bb9d6(0x430)][_0x27c33c]||0x0;},Game_BattlerBase['prototype'][_0x5851fa(0x44c)]=function(_0x5eead5){return this['buffTurns'](_0x5eead5);},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x440)]=function(_0x14acd9,_0x46a2a2){const _0x3a6bed=_0x5851fa;if(this['isBuffAffected'](_0x14acd9)){if(_0x3a6bed(0x17e)==='zojgP'){const _0x5a1fbd=VisuMZ[_0x3a6bed(0x316)][_0x3a6bed(0x1ad)]['Buffs'][_0x3a6bed(0x335)];this[_0x3a6bed(0x430)][_0x14acd9]=_0x46a2a2['clamp'](0x0,_0x5a1fbd);}else{if(typeof _0xb1e02f!==_0x3a6bed(0x2a7))_0x337916=_0x1ef08e['id'];return this[_0x3a6bed(0x3f5)][_0x59fae9]||0x0;}}},Game_BattlerBase[_0x5851fa(0x2da)]['addBuffTurns']=function(_0x407445,_0x2b91c2){const _0x70978c=_0x5851fa;this[_0x70978c(0x2d0)](_0x407445)&&(_0x2b91c2+=this[_0x70978c(0x25a)](stateId),this[_0x70978c(0x278)](_0x407445,_0x2b91c2));},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x3d0)]=function(_0xcbf4ca,_0xd9b345){const _0x3fee16=_0x5851fa;if(this[_0x3fee16(0x31e)](_0xcbf4ca)){if(_0x3fee16(0x152)!==_0x3fee16(0x35a)){const _0x274d90=VisuMZ[_0x3fee16(0x316)][_0x3fee16(0x1ad)][_0x3fee16(0x449)]['MaxTurns'];this[_0x3fee16(0x430)][_0xcbf4ca]=_0xd9b345[_0x3fee16(0x2e7)](0x0,_0x274d90);}else{if(!_0x4dfae5)return![];if(!_0x5c848c[_0x3fee16(0x316)]['Game_BattlerBase_meetsSkillConditions'][_0x3fee16(0x1c1)](this,_0x4663e8))return![];if(!this[_0x3fee16(0x3ca)](_0x431927))return![];if(!this['meetsSkillConditionsEnableJS'](_0x4cdcd5))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x5bd0e2))return![];return!![];}}},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x1ab)]=function(_0x477b4c,_0x221557){const _0xcc7aed=_0x5851fa;if(this[_0xcc7aed(0x31e)](_0x477b4c)){if('MQMJW'!==_0xcc7aed(0x31b))return _0xb9d62d[_0xcc7aed(0x316)]['Window_SkillList_maxCols'][_0xcc7aed(0x1c1)](this);else _0x221557+=this['buffTurns'](stateId),this[_0xcc7aed(0x278)](_0x477b4c,_0x221557);}},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x3bf)]=function(_0x4cb096){const _0x4298d2=_0x5851fa;if(typeof _0x4cb096!==_0x4298d2(0x2a7))_0x4cb096=_0x4cb096['id'];return this[_0x4298d2(0x2fe)]=this[_0x4298d2(0x2fe)]||{},this[_0x4298d2(0x2fe)][_0x4cb096]=this[_0x4298d2(0x2fe)][_0x4cb096]||{},this[_0x4298d2(0x2fe)][_0x4cb096];},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x2b0)]=function(_0x45840b,_0x38444d){const _0x44f32b=_0x5851fa;if(typeof _0x45840b!==_0x44f32b(0x2a7))_0x45840b=_0x45840b['id'];const _0x3974fd=this[_0x44f32b(0x3bf)](_0x45840b);return _0x3974fd[_0x38444d];},Game_BattlerBase[_0x5851fa(0x2da)]['setStateData']=function(_0x40e1f3,_0x3046a1,_0x4265a7){const _0x37de32=_0x5851fa;if(typeof _0x40e1f3!==_0x37de32(0x2a7))_0x40e1f3=_0x40e1f3['id'];const _0x941905=this[_0x37de32(0x3bf)](_0x40e1f3);_0x941905[_0x3046a1]=_0x4265a7;},Game_BattlerBase[_0x5851fa(0x2da)]['clearStateData']=function(_0x39a711){const _0x1ba6ec=_0x5851fa;if(typeof _0x39a711!==_0x1ba6ec(0x2a7))_0x39a711=_0x39a711['id'];this['_stateData']=this[_0x1ba6ec(0x2fe)]||{},this['_stateData'][_0x39a711]={};},Game_BattlerBase['prototype'][_0x5851fa(0x34c)]=function(_0x453ed7){const _0x18d302=_0x5851fa;if(typeof _0x453ed7!==_0x18d302(0x2a7))_0x453ed7=_0x453ed7['id'];return this['_stateDisplay']=this[_0x18d302(0x289)]||{},this[_0x18d302(0x289)][_0x453ed7]===undefined&&(this[_0x18d302(0x289)][_0x453ed7]=''),this['_stateDisplay'][_0x453ed7];},Game_BattlerBase[_0x5851fa(0x2da)]['setStateDisplay']=function(_0x3a9b60,_0x31c739){const _0x17c76d=_0x5851fa;if(typeof _0x3a9b60!==_0x17c76d(0x2a7))_0x3a9b60=_0x3a9b60['id'];this[_0x17c76d(0x289)]=this['_stateDisplay']||{},this['_stateDisplay'][_0x3a9b60]=_0x31c739;},Game_BattlerBase['prototype']['clearStateDisplay']=function(_0x32ac93){const _0x3cb2ca=_0x5851fa;if(typeof _0x32ac93!=='number')_0x32ac93=_0x32ac93['id'];this[_0x3cb2ca(0x289)]=this[_0x3cb2ca(0x289)]||{},this[_0x3cb2ca(0x289)][_0x32ac93]='';},Game_BattlerBase['prototype'][_0x5851fa(0x340)]=function(_0x4f84ba){const _0x4c3168=_0x5851fa;if(typeof _0x4f84ba!=='number')_0x4f84ba=_0x4f84ba['id'];this[_0x4c3168(0x324)]=this[_0x4c3168(0x324)]||{},this[_0x4c3168(0x324)][_0x4f84ba]=this[_0x4c3168(0x324)][_0x4f84ba]||_0x4c3168(0x2f1);const _0x274ece=this[_0x4c3168(0x324)][_0x4f84ba];return this[_0x4c3168(0x44d)](_0x274ece);},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x3e0)]=function(_0x5d2c1c,_0x10047a){const _0x3d3797=_0x5851fa;this['_stateOrigin']=this[_0x3d3797(0x324)]||{};const _0x2dc46e=_0x10047a?this[_0x3d3797(0x369)](_0x10047a):this['getCurrentStateOriginKey']();this[_0x3d3797(0x324)][_0x5d2c1c]=_0x2dc46e;},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x3ab)]=function(_0x1b2cb2){const _0x427a7d=_0x5851fa;this[_0x427a7d(0x324)]=this[_0x427a7d(0x324)]||{},delete this[_0x427a7d(0x324)][_0x1b2cb2];},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x20f)]=function(){const _0x26d6f5=_0x5851fa,_0x976077=this[_0x26d6f5(0x3de)]();return this[_0x26d6f5(0x369)](_0x976077);},Game_BattlerBase['prototype'][_0x5851fa(0x3de)]=function(){const _0x5d1edd=_0x5851fa;if($gameParty['inBattle']()){if('BAzVx'===_0x5d1edd(0x263)){if(typeof _0x5da3b3===_0x5d1edd(0x2a7))_0x11ba88=_0x4c65ff[_0x504509];const _0x4178dd=_0x5d1edd(0x3fe)[_0x5d1edd(0x33f)](_0xfffc14['id']);this[_0x5d1edd(0x3fa)]=this[_0x5d1edd(0x3fa)]||{};if(this[_0x5d1edd(0x3fa)][_0x4178dd])return this[_0x5d1edd(0x3fa)][_0x4178dd];const _0xdbcca2=this[_0x5d1edd(0x42e)](_0x194e91);return this[_0x5d1edd(0x2de)](_0x4178dd,_0xdbcca2);}else{if(BattleManager[_0x5d1edd(0x26d)])return BattleManager[_0x5d1edd(0x26d)];else{if(BattleManager[_0x5d1edd(0x338)])return BattleManager[_0x5d1edd(0x338)];}}}else{const _0xaa7ea5=SceneManager['_scene'];if(![Scene_Map,Scene_Item][_0x5d1edd(0x25f)](_0xaa7ea5['constructor'])){if(_0x5d1edd(0x176)!=='SyONf')_0x41c61a['SkillsStatesCore']['Game_Action_applyItemUserEffect'][_0x5d1edd(0x1c1)](this,_0x2deba8),this[_0x5d1edd(0x201)](_0x137090);else return $gameParty['menuActor']();}}return this;},Game_BattlerBase[_0x5851fa(0x2da)]['convertTargetToStateOriginKey']=function(_0x30579c){const _0x1da9ad=_0x5851fa;if(!_0x30579c)return'user';if(_0x30579c[_0x1da9ad(0x1cb)]())return'<actor-%1>'[_0x1da9ad(0x33f)](_0x30579c[_0x1da9ad(0x2f2)]());else{if(_0x1da9ad(0x408)!==_0x1da9ad(0x25d)){const _0x3e998f=_0x1da9ad(0x1e0)[_0x1da9ad(0x33f)](_0x30579c['enemyId']()),_0x54a090=_0x1da9ad(0x420)[_0x1da9ad(0x33f)](_0x30579c[_0x1da9ad(0x266)]()),_0x4fc047=_0x1da9ad(0x2eb)[_0x1da9ad(0x33f)]($gameTroop['getCurrentTroopUniqueID']());return _0x1da9ad(0x257)[_0x1da9ad(0x33f)](_0x3e998f,_0x54a090,_0x4fc047);}else{const _0x26dc3c=_0x39d64d[_0x1da9ad(0x312)]('['+_0x5e4031['$1'][_0x1da9ad(0x2cc)](/\d+/g)+']');for(const _0x367650 of _0x26dc3c){if(_0x5c5015[_0x1da9ad(0x31c)](_0x367650))return!![];}return![];}}return _0x1da9ad(0x2f1);},Game_BattlerBase['prototype'][_0x5851fa(0x44d)]=function(_0xab2ae){const _0x109f00=_0x5851fa;if(_0xab2ae===_0x109f00(0x2f1))return this;else{if(_0xab2ae[_0x109f00(0x2cc)](/<actor-(\d+)>/i))return $gameActors['actor'](Number(RegExp['$1']));else{if($gameParty['inBattle']()&&_0xab2ae['match'](/<troop-(\d+)>/i)){if(_0x109f00(0x2cb)===_0x109f00(0x2cb)){const _0x39fb51=Number(RegExp['$1']);if(_0x39fb51===$gameTroop['getCurrentTroopUniqueID']()){if(_0x109f00(0x2c2)!==_0x109f00(0x3e1)){if(_0xab2ae[_0x109f00(0x2cc)](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}else this['_hidden']=!![],this['updateVisibility']();}}else this[_0x109f00(0x243)]={},_0x5e9ae5[_0x109f00(0x316)][_0x109f00(0x421)][_0x109f00(0x1c1)](this);}if(_0xab2ae[_0x109f00(0x2cc)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x5851fa(0x316)]['Game_Battler_addState']=Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x251)],Game_Battler[_0x5851fa(0x2da)]['addState']=function(_0x395481){const _0xbd2f8d=_0x5851fa,_0x1cf5a9=this[_0xbd2f8d(0x18d)](_0x395481);VisuMZ[_0xbd2f8d(0x316)]['Game_Battler_addState'][_0xbd2f8d(0x1c1)](this,_0x395481);if(_0x1cf5a9&&this[_0xbd2f8d(0x2af)]($dataStates[_0x395481])){this['onAddState'](_0x395481);;}},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x448)]=Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x18d)],Game_Battler[_0x5851fa(0x2da)]['isStateAddable']=function(_0x38d643){const _0xbd7775=_0x5851fa,_0x55ad7e=$dataStates[_0x38d643];if(_0x55ad7e&&_0x55ad7e[_0xbd7775(0x433)][_0xbd7775(0x2cc)](/<NO DEATH CLEAR>/i)){if('NMjVO'===_0xbd7775(0x2d6)){const _0x3fba16=_0x53d27a[_0xbd7775(0x316)][_0xbd7775(0x1ad)][_0xbd7775(0x241)][_0xbd7775(0x2a5)](_0x2837b2=>_0x2837b2['Name'][_0xbd7775(0x42c)]()===_0x5a5f9d[_0xbd7775(0x42c)]());_0x3fba16[_0xbd7775(0x27d)]>=0x1?this[_0xbd7775(0x189)]=_0x3fba16[0x0]:this[_0xbd7775(0x189)]=null;}else return!this[_0xbd7775(0x19e)](_0x38d643)&&!this[_0xbd7775(0x30b)](_0x38d643)&&!this[_0xbd7775(0x2f6)][_0xbd7775(0x290)](_0x38d643);}return VisuMZ[_0xbd7775(0x316)][_0xbd7775(0x448)]['call'](this,_0x38d643);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x186)]=function(_0x2e3f49){const _0x3d6f7e=_0x5851fa;this['setStateOrigin'](_0x2e3f49),this['removeOtherStatesOfSameCategory'](_0x2e3f49),this[_0x3d6f7e(0x2a9)](_0x2e3f49),this[_0x3d6f7e(0x3c5)](_0x2e3f49),this[_0x3d6f7e(0x213)](_0x2e3f49);},Game_Battler['prototype']['onRemoveState']=function(_0x4491cc){const _0x53845f=_0x5851fa;this['onEraseStateCustomJS'](_0x4491cc),this[_0x53845f(0x2c1)](_0x4491cc),Game_BattlerBase[_0x53845f(0x2da)][_0x53845f(0x39c)][_0x53845f(0x1c1)](this,_0x4491cc);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x31d)]=function(_0xed725e){const _0x23dd0e=_0x5851fa;for(const _0x44b13d of this[_0x23dd0e(0x44e)]()){this[_0x23dd0e(0x43d)](_0x44b13d['id'])&&_0x44b13d[_0x23dd0e(0x1cd)]===_0xed725e&&(this['removeState'](_0x44b13d['id']),this['onExpireState'](_0x44b13d['id']),this[_0x23dd0e(0x2bb)](_0x44b13d['id']));}},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x20b)]=function(_0x499aff){this['onExpireStateCustomJS'](_0x499aff);},Game_Battler['prototype'][_0x5851fa(0x3c5)]=function(_0x2902eb){const _0x3384e5=_0x5851fa;if(this[_0x3384e5(0x1cc)]||this[_0x3384e5(0x414)])return;const _0x2d3fa0=VisuMZ[_0x3384e5(0x316)][_0x3384e5(0x2bd)];if(_0x2d3fa0[_0x2902eb])_0x2d3fa0[_0x2902eb][_0x3384e5(0x1c1)](this,_0x2902eb);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x393)]=function(_0x459e2d){const _0x302368=_0x5851fa;if(this['_tempActor']||this[_0x302368(0x414)])return;const _0x59fd0c=VisuMZ[_0x302368(0x316)]['stateEraseJS'];if(_0x59fd0c[_0x459e2d])_0x59fd0c[_0x459e2d][_0x302368(0x1c1)](this,_0x459e2d);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x1be)]=function(_0x243afa){const _0x147526=_0x5851fa;if(this[_0x147526(0x1cc)]||this[_0x147526(0x414)])return;const _0x36cdf4=VisuMZ['SkillsStatesCore'][_0x147526(0x21d)];if(_0x36cdf4[_0x243afa])_0x36cdf4[_0x243afa][_0x147526(0x1c1)](this,_0x243afa);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x213)]=function(_0x145715){const _0x4d76c2=_0x5851fa;if(this[_0x4d76c2(0x1cc)]||this[_0x4d76c2(0x414)])return;try{VisuMZ['SkillsStatesCore'][_0x4d76c2(0x1ad)][_0x4d76c2(0x334)][_0x4d76c2(0x358)][_0x4d76c2(0x1c1)](this,_0x145715);}catch(_0x1c3ac3){if(_0x4d76c2(0x1ed)===_0x4d76c2(0x1ef)){if(typeof _0xdb87d4!==_0x4d76c2(0x2a7))_0x469b4d=_0x24b2d7['id'];this[_0x4d76c2(0x289)]=this[_0x4d76c2(0x289)]||{},this['_stateDisplay'][_0x5dc2f2]=_0x1d1f39;}else{if($gameTemp[_0x4d76c2(0x297)]())console[_0x4d76c2(0x32f)](_0x1c3ac3);}}},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x2c1)]=function(_0x30c30b){const _0x4dd658=_0x5851fa;if(this[_0x4dd658(0x1cc)]||this[_0x4dd658(0x414)])return;try{VisuMZ[_0x4dd658(0x316)][_0x4dd658(0x1ad)][_0x4dd658(0x334)][_0x4dd658(0x1af)]['call'](this,_0x30c30b);}catch(_0x52b1d9){if($gameTemp[_0x4dd658(0x297)]())console[_0x4dd658(0x32f)](_0x52b1d9);}},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x2bb)]=function(_0x6eed98){const _0x4d3f44=_0x5851fa;if(this[_0x4d3f44(0x1cc)]||this[_0x4d3f44(0x414)])return;try{VisuMZ['SkillsStatesCore'][_0x4d3f44(0x1ad)][_0x4d3f44(0x334)][_0x4d3f44(0x300)]['call'](this,_0x6eed98);}catch(_0xede67){if($gameTemp[_0x4d3f44(0x297)]())console['log'](_0xede67);}},Game_Battler[_0x5851fa(0x2da)]['statesByCategory']=function(_0x1e0fa6){const _0x440407=_0x5851fa;return _0x1e0fa6=_0x1e0fa6['toUpperCase']()[_0x440407(0x206)](),this[_0x440407(0x44e)]()[_0x440407(0x2a5)](_0x3a0efe=>_0x3a0efe['categories'][_0x440407(0x25f)](_0x1e0fa6));},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x1b3)]=function(_0x4a9e7d,_0x4b0ca3){const _0x5dd055=_0x5851fa;_0x4a9e7d=_0x4a9e7d[_0x5dd055(0x42c)]()[_0x5dd055(0x206)](),_0x4b0ca3=_0x4b0ca3||0x0;const _0xe6e0dc=this[_0x5dd055(0x3e4)](_0x4a9e7d),_0xde9ef6=[];for(const _0x2387dd of _0xe6e0dc){if(_0x5dd055(0x2c6)==='ekFKb')for(const _0x5c6f7 of this[_0x5dd055(0x44e)]()){this[_0x5dd055(0x43d)](_0x5c6f7['id'])&&_0x5c6f7[_0x5dd055(0x1cd)]===_0x108c06&&(this['removeState'](_0x5c6f7['id']),this['onExpireState'](_0x5c6f7['id']),this[_0x5dd055(0x2bb)](_0x5c6f7['id']));}else{if(!_0x2387dd)continue;if(_0x4b0ca3<=0x0)break;_0xde9ef6[_0x5dd055(0x309)](_0x2387dd['id']),this[_0x5dd055(0x2f6)][_0x5dd055(0x39b)]=!![],_0x4b0ca3--;}}while(_0xde9ef6[_0x5dd055(0x27d)]>0x0){this['removeState'](_0xde9ef6[_0x5dd055(0x21c)]());}},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x1d0)]=function(_0x1962c4,_0x531b1f){const _0x7e509c=_0x5851fa;_0x1962c4=_0x1962c4[_0x7e509c(0x42c)]()[_0x7e509c(0x206)](),_0x531b1f=_0x531b1f||[];const _0x8d2ed=this['statesByCategory'](_0x1962c4),_0x2a85fd=[];for(const _0x390b02 of _0x8d2ed){if(!_0x390b02)continue;if(_0x531b1f[_0x7e509c(0x25f)](_0x390b02))continue;_0x2a85fd[_0x7e509c(0x309)](_0x390b02['id']),this['_result'][_0x7e509c(0x39b)]=!![];}while(_0x2a85fd[_0x7e509c(0x27d)]>0x0){this[_0x7e509c(0x1ea)](_0x2a85fd[_0x7e509c(0x21c)]());}},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x3ff)]=function(_0x1e11d7){return this['totalStateCategoryAffected'](_0x1e11d7)>0x0;},Game_Battler['prototype'][_0x5851fa(0x341)]=function(_0x170041){const _0x344be9=_0x5851fa;return this[_0x344be9(0x2a6)](_0x170041)>0x0;},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x262)]=function(_0x34cdaa){const _0x5bfe42=_0x5851fa,_0x266c03=this['statesByCategory'](_0x34cdaa)['filter'](_0x33fa6e=>this['isStateAffected'](_0x33fa6e['id']));return _0x266c03[_0x5bfe42(0x27d)];},Game_Battler[_0x5851fa(0x2da)]['totalStateCategory']=function(_0x3b9b1a){const _0x1a2549=this['statesByCategory'](_0x3b9b1a);return _0x1a2549['length'];},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x436)]=Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x19e)],Game_BattlerBase['prototype'][_0x5851fa(0x19e)]=function(_0x42937f){const _0x57b41b=_0x5851fa,_0x5d6274=$dataStates[_0x42937f];if(_0x5d6274&&_0x5d6274['categories'][_0x57b41b(0x27d)]>0x0){if(_0x57b41b(0x190)===_0x57b41b(0x190))for(const _0x5e3fb4 of _0x5d6274['categories']){if(_0x57b41b(0x304)!==_0x57b41b(0x304)){const _0xee445c=_0x428e53[_0x2be2ca-_0x589bd1[_0x57b41b(0x27d)]];this['drawActorBuffTurns'](_0x237b2f,_0xee445c,_0x201bd7,_0x2929ce),this[_0x57b41b(0x432)](_0xdfb689,_0xee445c,_0x3bbd64,_0x405106);}else{if(this[_0x57b41b(0x1a6)](_0x5e3fb4))return!![];}}else{_0x386aff[_0x57b41b(0x316)][_0x57b41b(0x1f1)][_0x57b41b(0x1c1)](this);if(this['_actor'])this[_0x57b41b(0x3d5)]();}}return VisuMZ[_0x57b41b(0x316)][_0x57b41b(0x436)][_0x57b41b(0x1c1)](this,_0x42937f);},Game_BattlerBase['prototype'][_0x5851fa(0x1a6)]=function(_0x103eb1){const _0x47708f=_0x5851fa;let _0x501ff4=_0x47708f(0x207);if(this['checkCacheKey'](_0x501ff4))return this[_0x47708f(0x243)][_0x501ff4][_0x47708f(0x25f)](_0x103eb1);return this[_0x47708f(0x243)][_0x501ff4]=this[_0x47708f(0x2be)](),this[_0x47708f(0x243)][_0x501ff4]['includes'](_0x103eb1);},Game_BattlerBase['prototype'][_0x5851fa(0x2be)]=function(){const _0x408105=_0x5851fa,_0x2d4ecc=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x4adfc1=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x587ddd=[];for(const _0x5d012d of this['traitObjects']()){if(!_0x5d012d)continue;const _0x14418a=_0x5d012d[_0x408105(0x433)],_0x4926f1=_0x14418a['match'](_0x2d4ecc);if(_0x4926f1)for(const _0x53af72 of _0x4926f1){_0x53af72[_0x408105(0x2cc)](_0x2d4ecc);const _0x4bd06d=String(RegExp['$1'])[_0x408105(0x388)](',')[_0x408105(0x195)](_0x4163ec=>String(_0x4163ec)['toUpperCase']()[_0x408105(0x206)]());_0x587ddd=_0x587ddd[_0x408105(0x3af)](_0x4bd06d);}if(_0x14418a['match'](_0x4adfc1)){const _0x4bbd48=String(RegExp['$1'])['split'](/[\r\n]+/)['map'](_0x202e45=>String(_0x202e45)['toUpperCase']()[_0x408105(0x206)]());_0x587ddd=_0x587ddd['concat'](_0x4bbd48);}}return _0x587ddd;},Game_BattlerBase['prototype']['removeOtherStatesOfSameCategory']=function(_0x13c8e8){const _0x55f3eb=_0x5851fa,_0x30d9ec=$dataStates[_0x13c8e8];if(!_0x30d9ec)return;const _0x462be0=_0x30d9ec['note']||'',_0xc413ae=_0x462be0['match'](/<REMOVE OTHER (.*) STATES>/gi);if(_0xc413ae){const _0x470176=[_0x30d9ec];for(const _0x4c59b6 of _0xc413ae){_0x4c59b6[_0x55f3eb(0x2cc)](/<REMOVE OTHER (.*) STATES>/i);const _0x2738ae=String(RegExp['$1']);this[_0x55f3eb(0x1d0)](_0x2738ae,_0x470176);}}},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x3ac)]=Game_Battler[_0x5851fa(0x2da)]['addBuff'],Game_Battler['prototype'][_0x5851fa(0x3b0)]=function(_0x55b333,_0x25cb91){const _0x53d619=_0x5851fa;VisuMZ['SkillsStatesCore'][_0x53d619(0x3ac)][_0x53d619(0x1c1)](this,_0x55b333,_0x25cb91),this[_0x53d619(0x2d0)](_0x55b333)&&this['onAddBuff'](_0x55b333,_0x25cb91);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x43c)]=function(_0x509448){},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x224)]=Game_Battler[_0x5851fa(0x2da)]['addDebuff'],Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x3d1)]=function(_0x47b7e2,_0x4a8c45){const _0x49dc1b=_0x5851fa;VisuMZ[_0x49dc1b(0x316)][_0x49dc1b(0x224)][_0x49dc1b(0x1c1)](this,_0x47b7e2,_0x4a8c45),this['isDebuffAffected'](_0x47b7e2)&&this[_0x49dc1b(0x325)](_0x47b7e2,_0x4a8c45);},Game_Battler['prototype']['removeBuffsAuto']=function(){const _0x21cad8=_0x5851fa;for(let _0x5be431=0x0;_0x5be431<this[_0x21cad8(0x1f6)]();_0x5be431++){if(this[_0x21cad8(0x268)](_0x5be431)){const _0x123df3=this[_0x21cad8(0x238)][_0x5be431];this[_0x21cad8(0x175)](_0x5be431);if(_0x123df3>0x0)this['onExpireBuff'](_0x5be431);if(_0x123df3<0x0)this[_0x21cad8(0x286)](_0x5be431);}}},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x3d8)]=function(_0x578b4f,_0x3efcd5){this['onAddBuffGlobalJS'](_0x578b4f,_0x3efcd5);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x325)]=function(_0x12a634,_0x454898){const _0x34eb79=_0x5851fa;this[_0x34eb79(0x3df)](_0x12a634,_0x454898);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x2f9)]=function(_0x38ee6e){const _0x4ba9f9=_0x5851fa;Game_BattlerBase[_0x4ba9f9(0x2da)]['onEraseBuff'][_0x4ba9f9(0x1c1)](this,_0x38ee6e),this[_0x4ba9f9(0x228)](_0x38ee6e);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x306)]=function(_0x3f458f){const _0x37a4b5=_0x5851fa;Game_BattlerBase[_0x37a4b5(0x2da)][_0x37a4b5(0x306)]['call'](this,_0x3f458f),this[_0x37a4b5(0x38e)](_0x3f458f);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x331)]=function(_0x15b2b6){this['onExpireBuffGlobalJS'](_0x15b2b6);},Game_Battler[_0x5851fa(0x2da)]['onExpireDebuff']=function(_0xb94f6a){const _0x4f0402=_0x5851fa;this[_0x4f0402(0x35c)](_0xb94f6a);},Game_Battler[_0x5851fa(0x2da)]['onAddBuffGlobalJS']=function(_0x1d4bbd,_0x196ffa){const _0x6df44f=_0x5851fa;VisuMZ[_0x6df44f(0x316)]['Settings'][_0x6df44f(0x449)][_0x6df44f(0x39a)]['call'](this,_0x1d4bbd,_0x196ffa);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x3df)]=function(_0x3c1b1a,_0x2ca9f9){const _0x4d1bc0=_0x5851fa;VisuMZ[_0x4d1bc0(0x316)][_0x4d1bc0(0x1ad)]['Buffs'][_0x4d1bc0(0x160)]['call'](this,_0x3c1b1a,_0x2ca9f9);},Game_BattlerBase[_0x5851fa(0x2da)][_0x5851fa(0x228)]=function(_0x24c66d){const _0x34413a=_0x5851fa;VisuMZ[_0x34413a(0x316)][_0x34413a(0x1ad)][_0x34413a(0x449)][_0x34413a(0x38d)][_0x34413a(0x1c1)](this,_0x24c66d);},Game_BattlerBase['prototype']['onEraseDebuffGlobalJS']=function(_0x539232){const _0x29be8a=_0x5851fa;VisuMZ[_0x29be8a(0x316)]['Settings'][_0x29be8a(0x449)][_0x29be8a(0x191)]['call'](this,_0x539232);},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x35f)]=function(_0x3f58e9){const _0x4fb209=_0x5851fa;VisuMZ[_0x4fb209(0x316)][_0x4fb209(0x1ad)][_0x4fb209(0x449)][_0x4fb209(0x428)][_0x4fb209(0x1c1)](this,_0x3f58e9);},Game_Battler[_0x5851fa(0x2da)]['onExpireDebuffGlobalJS']=function(_0x1aaf3c){const _0x418c85=_0x5851fa;VisuMZ[_0x418c85(0x316)][_0x418c85(0x1ad)][_0x418c85(0x449)][_0x418c85(0x260)][_0x418c85(0x1c1)](this,_0x1aaf3c);},Game_Battler['prototype'][_0x5851fa(0x2a9)]=function(_0x2eb1ac){const _0x156883=_0x5851fa,_0x5e54cf=VisuMZ[_0x156883(0x316)],_0x19b981=[_0x156883(0x24f),_0x156883(0x1d8),_0x156883(0x230),_0x156883(0x419),'stateTpSlipDamageJS','stateTpSlipHealJS'];for(const _0x425586 of _0x19b981){_0x156883(0x273)!==_0x156883(0x273)?this[_0x156883(0x2d0)](_0x5c48d5)&&(_0x142383+=this[_0x156883(0x25a)](_0x454c7e),this[_0x156883(0x278)](_0xa4561b,_0x4f465c)):_0x5e54cf[_0x425586][_0x2eb1ac]&&_0x5e54cf[_0x425586][_0x2eb1ac][_0x156883(0x1c1)](this,_0x2eb1ac);}},VisuMZ['SkillsStatesCore'][_0x5851fa(0x151)]=Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x36a)],Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x36a)]=function(){const _0xbcd583=_0x5851fa;this['recalculateSlipDamageJS'](),VisuMZ[_0xbcd583(0x316)]['Game_Battler_regenerateAll'][_0xbcd583(0x1c1)](this),this[_0xbcd583(0x16f)](),this[_0xbcd583(0x2e8)]();},Game_Battler[_0x5851fa(0x2da)]['setPassiveStateSlipDamageJS']=function(){const _0x447a35=_0x5851fa;for(const _0x688e97 of this[_0x447a35(0x1fb)]()){if(!_0x688e97)continue;this[_0x447a35(0x2a9)](_0x688e97['id']);}},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x424)]=function(){const _0x14b4f3=_0x5851fa;for(const _0x704bc3 of this[_0x14b4f3(0x44e)]()){if(!_0x704bc3)continue;if(_0x704bc3[_0x14b4f3(0x433)]['match'](/<JS SLIP REFRESH>/i)){if(_0x14b4f3(0x2b8)!==_0x14b4f3(0x3a7))this['onAddStateMakeCustomSlipValues'](_0x704bc3['id']);else return this;}}},Game_Battler[_0x5851fa(0x2da)][_0x5851fa(0x2e8)]=function(){const _0xb6e56=_0x5851fa;if(!this[_0xb6e56(0x3c0)]())return;const _0x19476c=this[_0xb6e56(0x44e)]();for(const _0x1bea7e of _0x19476c){if(_0xb6e56(0x219)===_0xb6e56(0x219)){if(!_0x1bea7e)continue;this[_0xb6e56(0x348)](_0x1bea7e);}else this[_0xb6e56(0x3d8)](_0x34044b,_0x47e906);}},Game_Battler[_0x5851fa(0x2da)]['onRegenerateCustomStateDamageOverTime']=function(_0x34af4f){const _0x20b06a=_0x5851fa,_0x14f388=this['getStateData'](_0x34af4f['id'],_0x20b06a(0x305))||0x0,_0x4bba34=-this[_0x20b06a(0x446)](),_0x214a2d=Math['max'](_0x14f388,_0x4bba34);if(_0x214a2d!==0x0){const _0x99edc1=this['_result'][_0x20b06a(0x2b6)]||0x0;this[_0x20b06a(0x3ce)](_0x214a2d),this[_0x20b06a(0x2f6)][_0x20b06a(0x2b6)]+=_0x99edc1;}const _0x4ec23b=this['getStateData'](_0x34af4f['id'],_0x20b06a(0x1f0))||0x0;if(_0x4ec23b!==0x0){if('sgBpw'!=='sgBpw'){if(!_0x4668c2[_0x20b06a(0x36d)](_0x5204c7))return![];}else{const _0x1bbbf9=this[_0x20b06a(0x2f6)][_0x20b06a(0x3fd)]||0x0;this[_0x20b06a(0x255)](_0x4ec23b),this[_0x20b06a(0x2f6)][_0x20b06a(0x3fd)]+=_0x1bbbf9;}}const _0x5e3975=this[_0x20b06a(0x2b0)](_0x34af4f['id'],_0x20b06a(0x3db))||0x0;_0x5e3975!==0x0&&this[_0x20b06a(0x39f)](_0x5e3975);},VisuMZ[_0x5851fa(0x316)]['Game_Actor_skillTypes']=Game_Actor[_0x5851fa(0x2da)]['skillTypes'],Game_Actor['prototype'][_0x5851fa(0x162)]=function(){const _0x311b66=_0x5851fa,_0x3c3db3=VisuMZ[_0x311b66(0x316)]['Game_Actor_skillTypes']['call'](this),_0x5b94ee=VisuMZ[_0x311b66(0x316)]['Settings'][_0x311b66(0x26b)];let _0x1e23cd=_0x5b94ee['HiddenSkillTypes'];if($gameParty[_0x311b66(0x345)]()){if(_0x311b66(0x396)!=='ZpjdL'){const _0x25045b=_0x3c4bc4[_0x311b66(0x316)][_0x311b66(0x1ad)][_0x311b66(0x380)][_0x311b66(0x31a)];this[_0x311b66(0x243)][_0x311b66(0x1fb)]=this[_0x311b66(0x243)][_0x311b66(0x1fb)][_0x311b66(0x3af)](_0x25045b);}else _0x1e23cd=_0x1e23cd['concat'](_0x5b94ee['BattleHiddenSkillTypes']);}return _0x3c3db3['filter'](_0x35c187=>!_0x1e23cd[_0x311b66(0x25f)](_0x35c187));},Game_Actor[_0x5851fa(0x2da)][_0x5851fa(0x25c)]=function(){const _0xd4f5c7=_0x5851fa;return this[_0xd4f5c7(0x33e)]()[_0xd4f5c7(0x2a5)](_0x3ffb12=>this['isSkillUsableForAutoBattle'](_0x3ffb12));},Game_Actor['prototype'][_0x5851fa(0x236)]=function(_0x1c794d){const _0x4d71c7=_0x5851fa;if(!this[_0x4d71c7(0x216)](_0x1c794d))return![];if(!_0x1c794d)return![];if(!this[_0x4d71c7(0x150)](_0x1c794d))return![];if(this[_0x4d71c7(0x327)](_0x1c794d))return![];return!![];},Game_Actor['prototype']['isSkillTypeMatchForUse']=function(_0x103803){const _0x1fee75=_0x5851fa,_0x40d90c=this[_0x1fee75(0x162)](),_0x24d1cc=DataManager[_0x1fee75(0x2fd)](_0x103803),_0x14eb1f=_0x40d90c[_0x1fee75(0x2a5)](_0x51f0dc=>_0x24d1cc[_0x1fee75(0x25f)](_0x51f0dc));return _0x14eb1f['length']>0x0;},Game_Actor[_0x5851fa(0x2da)]['isSkillHidden']=function(_0x3697f0){const _0x433464=_0x5851fa;if(!VisuMZ['SkillsStatesCore'][_0x433464(0x173)](this,_0x3697f0))return!![];if(!VisuMZ[_0x433464(0x316)][_0x433464(0x1fc)](this,_0x3697f0))return!![];if(!VisuMZ[_0x433464(0x316)]['CheckVisibleSkillNotetags'](this,_0x3697f0))return!![];return![];},Game_Actor[_0x5851fa(0x2da)]['passiveStateObjects']=function(){const _0x59e2d4=_0x5851fa;let _0x413544=[this[_0x59e2d4(0x214)](),this[_0x59e2d4(0x188)]()];_0x413544=_0x413544[_0x59e2d4(0x3af)](this['equips']()['filter'](_0x2596e2=>_0x2596e2));for(const _0x340524 of this[_0x59e2d4(0x295)]){const _0x131b0e=$dataSkills[_0x340524];if(_0x131b0e)_0x413544[_0x59e2d4(0x309)](_0x131b0e);}return _0x413544;},Game_Actor['prototype']['addPassiveStatesByPluginParameters']=function(){const _0x40f825=_0x5851fa;Game_Battler['prototype'][_0x40f825(0x410)]['call'](this);const _0x11f7f9=VisuMZ['SkillsStatesCore'][_0x40f825(0x1ad)]['PassiveStates'][_0x40f825(0x155)];this[_0x40f825(0x243)]['passiveStates']=this[_0x40f825(0x243)][_0x40f825(0x1fb)][_0x40f825(0x3af)](_0x11f7f9);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x16a)]=Game_Actor['prototype'][_0x5851fa(0x40e)],Game_Actor[_0x5851fa(0x2da)][_0x5851fa(0x40e)]=function(_0x4c04b7){const _0x3b645f=_0x5851fa;VisuMZ['SkillsStatesCore'][_0x3b645f(0x16a)][_0x3b645f(0x1c1)](this,_0x4c04b7),this[_0x3b645f(0x243)]={};},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x27b)]=Game_Actor[_0x5851fa(0x2da)][_0x5851fa(0x2ba)],Game_Actor[_0x5851fa(0x2da)]['forgetSkill']=function(_0x453aae){const _0x576932=_0x5851fa;VisuMZ[_0x576932(0x316)][_0x576932(0x27b)][_0x576932(0x1c1)](this,_0x453aae),this['_cache']={};},Game_Actor[_0x5851fa(0x2da)][_0x5851fa(0x271)]=function(){const _0x1fe9bc=_0x5851fa;return VisuMZ[_0x1fe9bc(0x316)][_0x1fe9bc(0x1ad)][_0x1fe9bc(0x334)]['TurnEndOnMap']??0x14;},Game_Enemy['prototype'][_0x5851fa(0x41c)]=function(){const _0x1e4024=_0x5851fa;let _0x48d314=[this[_0x1e4024(0x1dd)]()];return _0x48d314['concat'](this['skills']());},Game_Enemy[_0x5851fa(0x2da)][_0x5851fa(0x410)]=function(){const _0x23d13b=_0x5851fa;Game_Battler[_0x23d13b(0x2da)][_0x23d13b(0x410)][_0x23d13b(0x1c1)](this);const _0x5d96f2=VisuMZ['SkillsStatesCore'][_0x23d13b(0x1ad)][_0x23d13b(0x380)]['Enemy'];this[_0x23d13b(0x243)][_0x23d13b(0x1fb)]=this['_cache'][_0x23d13b(0x1fb)][_0x23d13b(0x3af)](_0x5d96f2);},Game_Enemy[_0x5851fa(0x2da)][_0x5851fa(0x33e)]=function(){const _0x1c4a49=_0x5851fa,_0x2796b3=[];for(const _0x44c03b of this['enemy']()[_0x1c4a49(0x321)]){const _0x5f3ab6=$dataSkills[_0x44c03b['skillId']];if(_0x5f3ab6&&!_0x2796b3[_0x1c4a49(0x25f)](_0x5f3ab6))_0x2796b3[_0x1c4a49(0x309)](_0x5f3ab6);}return _0x2796b3;},Game_Enemy[_0x5851fa(0x2da)][_0x5851fa(0x453)]=function(_0xf5359f){const _0x7154c9=_0x5851fa;return this[_0x7154c9(0x2af)]($dataStates[_0xf5359f]);},VisuMZ['SkillsStatesCore']['Game_Unit_isAllDead']=Game_Unit['prototype']['isAllDead'],Game_Unit[_0x5851fa(0x2da)]['isAllDead']=function(){const _0x2182e6=_0x5851fa;if(this[_0x2182e6(0x1d4)]())return!![];return VisuMZ['SkillsStatesCore']['Game_Unit_isAllDead'][_0x2182e6(0x1c1)](this);},Game_Unit[_0x5851fa(0x2da)][_0x5851fa(0x1d4)]=function(){const _0x559fb6=_0x5851fa,_0x314e0b=this[_0x559fb6(0x3c2)]();for(const _0x4a4ee5 of _0x314e0b){if(_0x559fb6(0x427)!==_0x559fb6(0x28a)){if(!_0x4a4ee5['isGroupDefeatStateAffected']())return![];}else!_0x22fbf5[_0x559fb6(0x25f)](_0x565177)&&this[_0x559fb6(0x203)](_0x45db32,_0x3c233f,_0x3276f9,_0x464339),this[_0x559fb6(0x360)](_0x5a1a0c,_0x59dfb3,_0x49e392,_0x3c8cb3),_0x27da0b[_0x559fb6(0x309)](_0x1244c8);}return!![];},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x40c)]=Game_Troop[_0x5851fa(0x2da)]['setup'],Game_Troop[_0x5851fa(0x2da)][_0x5851fa(0x36e)]=function(_0x3db43c){const _0x5e3e9f=_0x5851fa;VisuMZ[_0x5e3e9f(0x316)][_0x5e3e9f(0x40c)]['call'](this,_0x3db43c),this[_0x5e3e9f(0x400)]();},Game_Troop[_0x5851fa(0x2da)]['makeCurrentTroopUniqueID']=function(){const _0x8dfbe3=_0x5851fa;this[_0x8dfbe3(0x33b)]=Graphics[_0x8dfbe3(0x20a)];},Game_Troop[_0x5851fa(0x2da)]['getCurrentTroopUniqueID']=function(){const _0x4b5c70=_0x5851fa;return this['_currentTroopUniqueID']=this['_currentTroopUniqueID']||Graphics[_0x4b5c70(0x20a)],this[_0x4b5c70(0x33b)];},Scene_Skill['prototype'][_0x5851fa(0x237)]=function(){const _0x2177d7=_0x5851fa;if(ConfigManager[_0x2177d7(0x3c8)]&&ConfigManager[_0x2177d7(0x3f2)]!==undefined){if(_0x2177d7(0x2d1)==='nylDT')for(const _0x1511f3 of _0x2d8738){let _0x7a7c86=0x0,_0x2455bb=0x0;if(_0x1511f3[_0x2177d7(0x2cc)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x7a7c86=_0x292b70(_0x1a9449['$1']),_0x2455bb=_0x14b39f(_0x46a54b['$2']);else _0x1511f3['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x7a7c86=_0x2ee01e[_0x2177d7(0x3e9)](_0x5f23dc['$1']),_0x2455bb=_0x17e41c(_0x27104c['$2']));_0x3e2e1b[_0x2177d7(0x275)](_0x7a7c86,_0x2455bb),this[_0x2177d7(0x3ef)](_0x49d1b3);}else return ConfigManager[_0x2177d7(0x3f2)];}else{if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x2177d7(0x208)!==_0x2177d7(0x197))return this[_0x2177d7(0x3b4)]()[_0x2177d7(0x2cc)](/LOWER/i);else _0x2195ae=_0x16ef5f(_0x2408ca['$1']),_0xdc663d=_0x59459a(_0x1c0f6b['$2']);}else Scene_ItemBase[_0x2177d7(0x2da)][_0x2177d7(0x3a1)][_0x2177d7(0x1c1)](this);}},Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x3a1)]=function(){const _0x189b84=_0x5851fa;if(ConfigManager[_0x189b84(0x3c8)]&&ConfigManager[_0x189b84(0x261)]!==undefined)return ConfigManager[_0x189b84(0x261)];else return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x189b84(0x3b4)]()[_0x189b84(0x2cc)](/RIGHT/i):Scene_ItemBase[_0x189b84(0x2da)][_0x189b84(0x3a1)]['call'](this);},Scene_Skill['prototype'][_0x5851fa(0x3b4)]=function(){const _0x4c1dcc=_0x5851fa;return VisuMZ[_0x4c1dcc(0x316)][_0x4c1dcc(0x1ad)][_0x4c1dcc(0x26b)][_0x4c1dcc(0x285)];},Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x404)]=function(){const _0x2486b4=_0x5851fa;return this['_categoryWindow']&&this[_0x2486b4(0x187)][_0x2486b4(0x404)]();},Scene_Skill[_0x5851fa(0x2da)]['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x3611f1=_0x5851fa;return VisuMZ['SkillsStatesCore'][_0x3611f1(0x1ad)][_0x3611f1(0x26b)]['EnableLayout'];},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x301)]=Scene_Skill['prototype']['helpWindowRect'],Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x403)]=function(){const _0x7717de=_0x5851fa;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x7717de(0x1b0)]():VisuMZ[_0x7717de(0x316)][_0x7717de(0x301)]['call'](this);},Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x1b0)]=function(){const _0x1387ae=_0x5851fa,_0xaff4b4=0x0,_0x3237c4=this[_0x1387ae(0x411)](),_0x22bd6a=Graphics['boxWidth'],_0x19869f=this['helpAreaHeight']();return new Rectangle(_0xaff4b4,_0x3237c4,_0x22bd6a,_0x19869f);},VisuMZ['SkillsStatesCore'][_0x5851fa(0x2bc)]=Scene_Skill['prototype']['skillTypeWindowRect'],Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x3e3)]=function(){const _0x37d44f=_0x5851fa;if(this[_0x37d44f(0x232)]())return this[_0x37d44f(0x17f)]();else{if(_0x37d44f(0x426)==='UUOWw'){if(!_0xa4a0c7)return;_0x353dd5['prototype']['drawActorIcons'][_0x37d44f(0x1c1)](this,_0x21b18d,_0x5d3970,_0x5eb233,_0x5e28b8);}else return VisuMZ[_0x37d44f(0x316)][_0x37d44f(0x2bc)]['call'](this);}},Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x17f)]=function(){const _0x2c062f=_0x5851fa,_0x2e54f3=this[_0x2c062f(0x231)](),_0x4a2ef8=this[_0x2c062f(0x3bb)](0x3,!![]),_0x1a9d86=this[_0x2c062f(0x3a1)]()?Graphics[_0x2c062f(0x3e2)]-_0x2e54f3:0x0,_0x59b1fe=this[_0x2c062f(0x1a5)]();return new Rectangle(_0x1a9d86,_0x59b1fe,_0x2e54f3,_0x4a2ef8);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x35e)]=Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x23a)],Scene_Skill['prototype'][_0x5851fa(0x23a)]=function(){const _0x52e499=_0x5851fa;if(this[_0x52e499(0x232)]())return this['statusWindowRectSkillsStatesCore']();else{if(_0x52e499(0x1b6)!==_0x52e499(0x1b7))return VisuMZ[_0x52e499(0x316)]['Scene_Skill_statusWindowRect']['call'](this);else for(const _0x5d6739 of _0x30fbc7){_0x5d6739[_0x52e499(0x2cc)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x3f26b0=_0x2e3bd0[_0x52e499(0x342)](_0x43d40a(_0xb9b20a['$1'])[_0x52e499(0x42c)]()),_0x40f418=_0x36d9fd(_0x47fbab['$2']);_0x3f26b0>=0x0&&(_0x534a14[_0x52e499(0x1ab)](_0x3f26b0,_0x40f418),this[_0x52e499(0x3ef)](_0x4ddd36));}}},Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x212)]=function(){const _0x2b5467=_0x5851fa,_0x188718=Graphics[_0x2b5467(0x3e2)]-this[_0x2b5467(0x231)](),_0x32bf89=this['_skillTypeWindow']['height'],_0x8c4031=this[_0x2b5467(0x3a1)]()?0x0:Graphics[_0x2b5467(0x3e2)]-_0x188718,_0x87e781=this[_0x2b5467(0x1a5)]();return new Rectangle(_0x8c4031,_0x87e781,_0x188718,_0x32bf89);},VisuMZ['SkillsStatesCore'][_0x5851fa(0x2a2)]=Scene_Skill[_0x5851fa(0x2da)]['createItemWindow'],Scene_Skill['prototype'][_0x5851fa(0x363)]=function(){const _0x1a713d=_0x5851fa;VisuMZ['SkillsStatesCore'][_0x1a713d(0x2a2)][_0x1a713d(0x1c1)](this),this[_0x1a713d(0x343)]()&&this[_0x1a713d(0x328)]();},VisuMZ['SkillsStatesCore'][_0x5851fa(0x28e)]=Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x1e3)],Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x1e3)]=function(){const _0x108cac=_0x5851fa;if(this[_0x108cac(0x232)]()){if(_0x108cac(0x29e)!==_0x108cac(0x3cd))return this[_0x108cac(0x26a)]();else{const _0x2c8957=this[_0x108cac(0x238)][_0x33f2b9];_0x12938b[_0x108cac(0x316)][_0x108cac(0x1a8)][_0x108cac(0x1c1)](this,_0x4bf8ea);if(_0x2c8957>0x0)this[_0x108cac(0x2f9)](_0x5ef255);if(_0x2c8957<0x0)this[_0x108cac(0x306)](_0xa2a85f);}}else{const _0x225588=VisuMZ[_0x108cac(0x316)]['Scene_Skill_itemWindowRect']['call'](this);if(this[_0x108cac(0x343)]()&&this[_0x108cac(0x276)]()){if(_0x108cac(0x222)!==_0x108cac(0x3f0))_0x225588[_0x108cac(0x3cf)]-=this[_0x108cac(0x347)]();else{const _0x4d4b43=_0x4723ce[_0x108cac(0x312)]('['+_0x110bac['$1'][_0x108cac(0x2cc)](/\d+/g)+']');for(const _0xa39c7c of _0x4d4b43){if(!_0x435910[_0x108cac(0x22e)](_0xa39c7c))return!![];}return![];}}return _0x225588;}},Scene_Skill['prototype'][_0x5851fa(0x26a)]=function(){const _0x39d27d=_0x5851fa,_0x1b289b=Graphics[_0x39d27d(0x3e2)]-this[_0x39d27d(0x347)](),_0x464368=this['mainAreaHeight']()-this[_0x39d27d(0x3c7)][_0x39d27d(0x378)],_0x55b279=this[_0x39d27d(0x3a1)]()?Graphics[_0x39d27d(0x3e2)]-_0x1b289b:0x0,_0x11a974=this[_0x39d27d(0x3c7)]['y']+this[_0x39d27d(0x3c7)]['height'];return new Rectangle(_0x55b279,_0x11a974,_0x1b289b,_0x464368);},Scene_Skill[_0x5851fa(0x2da)]['allowCreateShopStatusWindow']=function(){const _0x3cafcc=_0x5851fa;if(!Imported[_0x3cafcc(0x163)])return![];else{if(this['isUseSkillsStatesCoreUpdatedLayout']()){if('wYMrr'===_0x3cafcc(0x2ca)){if(typeof _0xa2dfff!==_0x3cafcc(0x2a7))_0x59ef57=_0x398ffc['id'];const _0x33d2a6=this[_0x3cafcc(0x3bf)](_0x54474f);_0x33d2a6[_0xa4ff7c]=_0x22fd09;}else return!![];}else return VisuMZ[_0x3cafcc(0x316)][_0x3cafcc(0x1ad)][_0x3cafcc(0x26b)]['ShowShopStatus'];}},Scene_Skill['prototype'][_0x5851fa(0x276)]=function(){const _0x530aad=_0x5851fa;return VisuMZ[_0x530aad(0x316)][_0x530aad(0x1ad)][_0x530aad(0x26b)][_0x530aad(0x247)];},Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x328)]=function(){const _0x5525bd=_0x5851fa,_0x3836b3=this[_0x5525bd(0x2e3)]();this['_shopStatusWindow']=new Window_ShopStatus(_0x3836b3),this[_0x5525bd(0x1f4)](this[_0x5525bd(0x2e1)]),this[_0x5525bd(0x2fa)][_0x5525bd(0x386)](this['_shopStatusWindow']);const _0x557b38=VisuMZ['SkillsStatesCore'][_0x5525bd(0x1ad)][_0x5525bd(0x26b)]['SkillSceneStatusBgType'];this[_0x5525bd(0x2e1)][_0x5525bd(0x192)](_0x557b38||0x0);},Scene_Skill[_0x5851fa(0x2da)][_0x5851fa(0x2e3)]=function(){const _0x54c0d3=_0x5851fa;if(this[_0x54c0d3(0x232)]()){if(_0x54c0d3(0x223)!==_0x54c0d3(0x223)){const _0x36a375=_0x2b4867[_0x54c0d3(0x2da)][_0x54c0d3(0x15f)]();this[_0x54c0d3(0x30f)]=new _0x3ce559(),this[_0x54c0d3(0x30f)][_0x54c0d3(0x159)]=new _0x118f44(_0xe734a6['iconWidth'],_0x36a375),this[_0x54c0d3(0x30f)]['anchor']['x']=this[_0x54c0d3(0x272)]['x'],this[_0x54c0d3(0x30f)][_0x54c0d3(0x272)]['y']=this['anchor']['y'],this[_0x54c0d3(0x21f)](this[_0x54c0d3(0x30f)]),this[_0x54c0d3(0x184)]=this[_0x54c0d3(0x30f)][_0x54c0d3(0x159)];}else return this[_0x54c0d3(0x280)]();}else return VisuMZ['SkillsStatesCore'][_0x54c0d3(0x1ad)][_0x54c0d3(0x26b)][_0x54c0d3(0x443)][_0x54c0d3(0x1c1)](this);},Scene_Skill[_0x5851fa(0x2da)]['shopStatusWindowRectSkillsStatesCore']=function(){const _0x5382d2=_0x5851fa,_0x3f6765=this['shopStatusWidth'](),_0x23fda6=this[_0x5382d2(0x2fa)][_0x5382d2(0x378)],_0x2e4e05=this[_0x5382d2(0x3a1)]()?0x0:Graphics[_0x5382d2(0x3e2)]-this[_0x5382d2(0x347)](),_0x15126b=this['_itemWindow']['y'];return new Rectangle(_0x2e4e05,_0x15126b,_0x3f6765,_0x23fda6);},Scene_Skill[_0x5851fa(0x2da)]['shopStatusWidth']=function(){const _0x388b40=_0x5851fa;return Imported['VisuMZ_1_ItemsEquipsCore']?_0x388b40(0x22c)===_0x388b40(0x22c)?Scene_Shop[_0x388b40(0x2da)][_0x388b40(0x1fe)]():_0x5a4329[_0x388b40(0x316)][_0x388b40(0x1ad)][_0x388b40(0x334)][_0x388b40(0x425)]:0x0;},Scene_Skill['prototype'][_0x5851fa(0x37c)]=function(){const _0xa69e1e=_0x5851fa;if(this[_0xa69e1e(0x1df)]&&this[_0xa69e1e(0x1df)]['active']){if('fbcNA'!==_0xa69e1e(0x39d)){this[_0xa69e1e(0x186)](_0x1a2136);;}else return TextManager['buttonAssistSwitch'];}else return'';},VisuMZ['SkillsStatesCore']['Sprite_Gauge_initMembers']=Sprite_Gauge['prototype'][_0x5851fa(0x37d)],Sprite_Gauge[_0x5851fa(0x2da)]['initMembers']=function(){const _0x5b22f4=_0x5851fa;VisuMZ[_0x5b22f4(0x316)][_0x5b22f4(0x2dc)][_0x5b22f4(0x1c1)](this),this[_0x5b22f4(0x189)]=null;},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x19f)]=Sprite_Gauge[_0x5851fa(0x2da)][_0x5851fa(0x36e)],Sprite_Gauge[_0x5851fa(0x2da)][_0x5851fa(0x36e)]=function(_0x1228ec,_0x26e15b){const _0x1a4073=_0x5851fa;this[_0x1a4073(0x270)](_0x1228ec,_0x26e15b),_0x26e15b=_0x26e15b[_0x1a4073(0x1c6)](),VisuMZ['SkillsStatesCore']['Sprite_Gauge_setup'][_0x1a4073(0x1c1)](this,_0x1228ec,_0x26e15b);},Sprite_Gauge['prototype'][_0x5851fa(0x270)]=function(_0x129252,_0x110e08){const _0x3ac7d6=_0x5851fa,_0x36b1a0=VisuMZ[_0x3ac7d6(0x316)][_0x3ac7d6(0x1ad)][_0x3ac7d6(0x241)][_0x3ac7d6(0x2a5)](_0xa8ab8c=>_0xa8ab8c[_0x3ac7d6(0x21e)][_0x3ac7d6(0x42c)]()===_0x110e08[_0x3ac7d6(0x42c)]());_0x36b1a0[_0x3ac7d6(0x27d)]>=0x1?this[_0x3ac7d6(0x189)]=_0x36b1a0[0x0]:this[_0x3ac7d6(0x189)]=null;},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x2ee)]=Sprite_Gauge[_0x5851fa(0x2da)]['currentValue'],Sprite_Gauge['prototype'][_0x5851fa(0x25e)]=function(){const _0x5ae177=_0x5851fa;return this[_0x5ae177(0x1f7)]&&this[_0x5ae177(0x189)]?this[_0x5ae177(0x267)]():VisuMZ[_0x5ae177(0x316)][_0x5ae177(0x2ee)][_0x5ae177(0x1c1)](this);},Sprite_Gauge['prototype'][_0x5851fa(0x267)]=function(){const _0x8f6039=_0x5851fa;return this['_costSettings'][_0x8f6039(0x1b2)]['call'](this[_0x8f6039(0x1f7)]);},VisuMZ[_0x5851fa(0x316)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge['prototype'][_0x5851fa(0x204)],Sprite_Gauge[_0x5851fa(0x2da)][_0x5851fa(0x204)]=function(){const _0xe7fb7d=_0x5851fa;if(this[_0xe7fb7d(0x1f7)]&&this[_0xe7fb7d(0x189)]){if(_0xe7fb7d(0x3bd)===_0xe7fb7d(0x311)){const _0xf4160e=[];for(const _0x1867a2 of this[_0xe7fb7d(0x1dd)]()[_0xe7fb7d(0x321)]){const _0x257c17=_0x1e516e[_0x1867a2['skillId']];if(_0x257c17&&!_0xf4160e['includes'](_0x257c17))_0xf4160e[_0xe7fb7d(0x309)](_0x257c17);}return _0xf4160e;}else return this[_0xe7fb7d(0x2ec)]();}else return _0xe7fb7d(0x35d)===_0xe7fb7d(0x401)?(this[_0xe7fb7d(0x243)]=this[_0xe7fb7d(0x243)]||{},this['_cache'][_0x2cb939]!==_0x1defb9):VisuMZ[_0xe7fb7d(0x316)][_0xe7fb7d(0x2a8)]['call'](this);},Sprite_Gauge[_0x5851fa(0x2da)][_0x5851fa(0x2ec)]=function(){const _0x300f93=_0x5851fa;return this[_0x300f93(0x189)][_0x300f93(0x242)][_0x300f93(0x1c1)](this[_0x300f93(0x1f7)]);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x246)]=Sprite_Gauge['prototype'][_0x5851fa(0x375)],Sprite_Gauge[_0x5851fa(0x2da)][_0x5851fa(0x375)]=function(){const _0x513537=_0x5851fa,_0x38a1db=VisuMZ[_0x513537(0x316)][_0x513537(0x246)][_0x513537(0x1c1)](this);return _0x38a1db['clamp'](0x0,0x1);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x3a0)]=Sprite_Gauge[_0x5851fa(0x2da)][_0x5851fa(0x234)],Sprite_Gauge[_0x5851fa(0x2da)][_0x5851fa(0x234)]=function(){const _0x4cb37c=_0x5851fa;if(this['_battler']&&this[_0x4cb37c(0x189)])_0x4cb37c(0x239)!==_0x4cb37c(0x239)?(this['recalculateSlipDamageJS'](),_0x1eeab1[_0x4cb37c(0x316)]['Game_Battler_regenerateAll'][_0x4cb37c(0x1c1)](this),this[_0x4cb37c(0x16f)](),this[_0x4cb37c(0x2e8)]()):(this[_0x4cb37c(0x159)][_0x4cb37c(0x1c5)](),this[_0x4cb37c(0x26e)]());else{if(_0x4cb37c(0x16b)===_0x4cb37c(0x16b))VisuMZ['SkillsStatesCore'][_0x4cb37c(0x3a0)][_0x4cb37c(0x1c1)](this);else{const _0x3f12b6=_0x293003[_0x4cb37c(0x312)]('['+_0x363bdf['$1']['match'](/\d+/g)+']');for(const _0x4fa8fa of _0x3f12b6){if(!_0x423ec8[_0x4cb37c(0x22e)](_0x4fa8fa))return!![];}return![];}}},Sprite_Gauge[_0x5851fa(0x2da)][_0x5851fa(0x293)]=function(){const _0x59d906=_0x5851fa;let _0x2a3150=this[_0x59d906(0x25e)]();return Imported[_0x59d906(0x177)]&&this[_0x59d906(0x32c)]()&&(_0x2a3150=VisuMZ[_0x59d906(0x2d5)](_0x2a3150)),_0x2a3150;},Sprite_Gauge[_0x5851fa(0x2da)]['redrawSkillsStatesCore']=function(){const _0x470ca3=_0x5851fa;this['_costSettings'][_0x470ca3(0x279)]['call'](this);},Sprite_Gauge[_0x5851fa(0x2da)][_0x5851fa(0x199)]=function(_0x91cb15,_0x54b12e,_0x1a0f8a,_0x123ede,_0x3db305,_0x342225){const _0x13dddb=_0x5851fa,_0x3f3b04=this[_0x13dddb(0x375)](),_0x70e1f0=Math[_0x13dddb(0x3a4)]((_0x3db305-0x2)*_0x3f3b04),_0x17e9b8=_0x342225-0x2,_0x25f648=this['gaugeBackColor']();this['bitmap'][_0x13dddb(0x3eb)](_0x1a0f8a,_0x123ede,_0x3db305,_0x342225,_0x25f648),this[_0x13dddb(0x159)]['gradientFillRect'](_0x1a0f8a+0x1,_0x123ede+0x1,_0x70e1f0,_0x17e9b8,_0x91cb15,_0x54b12e);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x2c8)]=Sprite_StateIcon['prototype'][_0x5851fa(0x23c)],Sprite_StateIcon['prototype'][_0x5851fa(0x23c)]=function(){const _0x1b49a5=_0x5851fa;VisuMZ['SkillsStatesCore'][_0x1b49a5(0x2c8)][_0x1b49a5(0x1c1)](this),this[_0x1b49a5(0x3e8)]();},Sprite_StateIcon[_0x5851fa(0x2da)]['createTurnDisplaySprite']=function(){const _0x2437b6=_0x5851fa,_0x20ca19=Window_Base[_0x2437b6(0x2da)][_0x2437b6(0x15f)]();this[_0x2437b6(0x30f)]=new Sprite(),this['_turnDisplaySprite'][_0x2437b6(0x159)]=new Bitmap(ImageManager['iconWidth'],_0x20ca19),this[_0x2437b6(0x30f)][_0x2437b6(0x272)]['x']=this[_0x2437b6(0x272)]['x'],this['_turnDisplaySprite'][_0x2437b6(0x272)]['y']=this[_0x2437b6(0x272)]['y'],this[_0x2437b6(0x21f)](this[_0x2437b6(0x30f)]),this['contents']=this[_0x2437b6(0x30f)][_0x2437b6(0x159)];},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x3be)]=Sprite_StateIcon[_0x5851fa(0x2da)][_0x5851fa(0x181)],Sprite_StateIcon[_0x5851fa(0x2da)][_0x5851fa(0x181)]=function(){const _0x334257=_0x5851fa;VisuMZ[_0x334257(0x316)][_0x334257(0x3be)]['call'](this),this['updateTurnDisplaySprite']();},Sprite_StateIcon[_0x5851fa(0x2da)]['drawText']=function(_0x5176ee,_0x59cba8,_0x39f1ed,_0xabc9b7,_0x46cffd){const _0x51f8ea=_0x5851fa;this['contents'][_0x51f8ea(0x44b)](_0x5176ee,_0x59cba8,_0x39f1ed,_0xabc9b7,this[_0x51f8ea(0x184)][_0x51f8ea(0x378)],_0x46cffd);},Sprite_StateIcon[_0x5851fa(0x2da)][_0x5851fa(0x2aa)]=function(){const _0xed2b95=_0x5851fa;this[_0xed2b95(0x161)](),this['contents'][_0xed2b95(0x1c5)]();const _0x46f008=this['_battler'];if(!_0x46f008)return;const _0x27488b=_0x46f008['states']()[_0xed2b95(0x2a5)](_0x64ae4f=>_0x64ae4f[_0xed2b95(0x27a)]>0x0),_0x2f4e3a=[...Array(0x8)[_0xed2b95(0x330)]()]['filter'](_0x173646=>_0x46f008[_0xed2b95(0x323)](_0x173646)!==0x0),_0x54307c=this[_0xed2b95(0x40f)],_0x4f4d2f=_0x27488b[_0x54307c];if(_0x4f4d2f){if(_0xed2b95(0x415)===_0xed2b95(0x415))Window_Base[_0xed2b95(0x2da)][_0xed2b95(0x203)]['call'](this,_0x46f008,_0x4f4d2f,0x0,0x0),Window_Base[_0xed2b95(0x2da)][_0xed2b95(0x360)][_0xed2b95(0x1c1)](this,_0x46f008,_0x4f4d2f,0x0,0x0);else return _0xd127bf(_0x41ee1e['$1']);}else{const _0x50e802=_0x2f4e3a[_0x54307c-_0x27488b[_0xed2b95(0x27d)]];if(_0x50e802===undefined)return;Window_Base[_0xed2b95(0x2da)]['drawActorBuffTurns'][_0xed2b95(0x1c1)](this,_0x46f008,_0x50e802,0x0,0x0),Window_Base[_0xed2b95(0x2da)][_0xed2b95(0x432)]['call'](this,_0x46f008,_0x50e802,0x0,0x0);}},Sprite_StateIcon[_0x5851fa(0x2da)][_0x5851fa(0x161)]=function(){const _0x3dd353=_0x5851fa;this[_0x3dd353(0x184)][_0x3dd353(0x21a)]=$gameSystem[_0x3dd353(0x339)](),this[_0x3dd353(0x184)]['fontSize']=$gameSystem['mainFontSize'](),this[_0x3dd353(0x33c)]();},Sprite_StateIcon['prototype']['resetTextColor']=function(){const _0x5959b6=_0x5851fa;this['changeTextColor'](ColorManager['normalColor']()),this[_0x5959b6(0x16e)](ColorManager[_0x5959b6(0x259)]());},Sprite_StateIcon[_0x5851fa(0x2da)]['changeTextColor']=function(_0x51a269){const _0x10c195=_0x5851fa;this[_0x10c195(0x184)][_0x10c195(0x23e)]=_0x51a269;},Sprite_StateIcon[_0x5851fa(0x2da)][_0x5851fa(0x16e)]=function(_0x13a352){const _0x23fac9=_0x5851fa;this[_0x23fac9(0x184)][_0x23fac9(0x259)]=_0x13a352;},Sprite_StateIcon[_0x5851fa(0x2da)]['hide']=function(){const _0x44bbed=_0x5851fa;this[_0x44bbed(0x153)]=!![],this[_0x44bbed(0x33d)]();},Window_Base[_0x5851fa(0x2da)]['drawSkillCost']=function(_0x3f7a24,_0x2bd47c,_0x3d30fb,_0x1f8277,_0x50bd95){const _0x25a688=_0x5851fa,_0x52c340=this[_0x25a688(0x451)](_0x3f7a24,_0x2bd47c),_0x1562c8=this[_0x25a688(0x1f9)](_0x52c340,_0x3d30fb,_0x1f8277,_0x50bd95),_0x565578=_0x3d30fb+_0x50bd95-_0x1562c8[_0x25a688(0x3cf)];this['drawTextEx'](_0x52c340,_0x565578,_0x1f8277,_0x50bd95),this[_0x25a688(0x161)]();},Window_Base['prototype'][_0x5851fa(0x451)]=function(_0x3ac1bd,_0xacd762){const _0x2bc667=_0x5851fa;let _0x2729c2='';for(settings of VisuMZ[_0x2bc667(0x316)][_0x2bc667(0x1ad)]['Costs']){if(_0x2bc667(0x38b)===_0x2bc667(0x40b))_0x5c054d['SkillsStatesCore'][_0x2bc667(0x1ad)][_0x2bc667(0x449)]['onEraseBuffJS'][_0x2bc667(0x1c1)](this,_0x565095);else{if(!this[_0x2bc667(0x240)](_0x3ac1bd,_0xacd762,settings))continue;if(_0x2729c2['length']>0x0)_0x2729c2+=this[_0x2bc667(0x17d)]();_0x2729c2+=this[_0x2bc667(0x2b4)](_0x3ac1bd,_0xacd762,settings);}}_0x2729c2=this[_0x2bc667(0x422)](_0x3ac1bd,_0xacd762,_0x2729c2);if(_0xacd762[_0x2bc667(0x433)][_0x2bc667(0x2cc)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x2729c2['length']>0x0)_0x2729c2+=this[_0x2bc667(0x17d)]();_0x2729c2+=String(RegExp['$1']);}return _0x2729c2;},Window_Base[_0x5851fa(0x2da)][_0x5851fa(0x422)]=function(_0x288fff,_0x407343,_0x7732e6){return _0x7732e6;},Window_Base[_0x5851fa(0x2da)]['isSkillCostShown']=function(_0x170630,_0x1ac67e,_0x47f839){const _0x97fdec=_0x5851fa,_0x3c855b=_0x47f839[_0x97fdec(0x385)][_0x97fdec(0x1c1)](_0x170630,_0x1ac67e);return _0x47f839[_0x97fdec(0x412)][_0x97fdec(0x1c1)](_0x170630,_0x1ac67e,_0x3c855b,_0x47f839);},Window_Base[_0x5851fa(0x2da)]['createSkillCostText']=function(_0x5cd573,_0x15200a,_0x19ecf3){const _0x5838a9=_0x5851fa,_0x4942f1=_0x19ecf3[_0x5838a9(0x385)][_0x5838a9(0x1c1)](_0x5cd573,_0x15200a);return _0x19ecf3[_0x5838a9(0x23f)][_0x5838a9(0x1c1)](_0x5cd573,_0x15200a,_0x4942f1,_0x19ecf3);},Window_Base[_0x5851fa(0x2da)][_0x5851fa(0x17d)]=function(){return'\x20';},Window_Base['prototype'][_0x5851fa(0x1d2)]=function(_0x4f59c9,_0xbdb492,_0x20b761,_0x548e54){const _0x9cec60=_0x5851fa;if(!_0x4f59c9)return;VisuMZ[_0x9cec60(0x316)]['Window_StatusBase_drawActorIcons'][_0x9cec60(0x1c1)](this,_0x4f59c9,_0xbdb492,_0x20b761,_0x548e54),this['drawActorIconsAllTurnCounters'](_0x4f59c9,_0xbdb492,_0x20b761,_0x548e54);},Window_Base[_0x5851fa(0x2da)][_0x5851fa(0x29c)]=function(_0x506de3,_0x398b70,_0x1e3fd4,_0x11ad38){const _0x3010f8=_0x5851fa;_0x11ad38=_0x11ad38||0x90;const _0x1945c6=ImageManager[_0x3010f8(0x357)],_0x479dae=_0x506de3[_0x3010f8(0x288)]()[_0x3010f8(0x355)](0x0,Math[_0x3010f8(0x3a4)](_0x11ad38/_0x1945c6)),_0x50f52b=_0x506de3[_0x3010f8(0x44e)]()[_0x3010f8(0x2a5)](_0x41485e=>_0x41485e[_0x3010f8(0x27a)]>0x0),_0x2d6d82=[...Array(0x8)[_0x3010f8(0x330)]()][_0x3010f8(0x2a5)](_0x4e075c=>_0x506de3[_0x3010f8(0x323)](_0x4e075c)!==0x0),_0x82b177=[];let _0x53aa6c=_0x398b70;for(let _0x3179a9=0x0;_0x3179a9<_0x479dae[_0x3010f8(0x27d)];_0x3179a9++){this['resetFontSettings']();const _0x8bdebf=_0x50f52b[_0x3179a9];if(_0x8bdebf){if(_0x3010f8(0x38f)===_0x3010f8(0x384))this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x3010f8(0x243)][_0x3010f8(0x1fb)]=[],this[_0x3010f8(0x3d6)](),this[_0x3010f8(0x17a)](),this[_0x3010f8(0x410)](),this['_checkingVisuMzPassiveStateObjects']=_0x2ba1be;else{if(!_0x82b177[_0x3010f8(0x25f)](_0x8bdebf)){if(_0x3010f8(0x24c)!==_0x3010f8(0x24c))for(const _0x3bfbbe of _0x409ae4){_0x3bfbbe['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3f79d7=_0x331118(_0x50cb47['$1'])[_0x3010f8(0x42c)]()[_0x3010f8(0x206)]()[_0x3010f8(0x388)](',');for(const _0x332b53 of _0x3f79d7){_0x40812e[_0x3010f8(0x274)]['push'](_0x332b53['trim']());}}else this[_0x3010f8(0x203)](_0x506de3,_0x8bdebf,_0x53aa6c,_0x1e3fd4);}this[_0x3010f8(0x360)](_0x506de3,_0x8bdebf,_0x53aa6c,_0x1e3fd4),_0x82b177['push'](_0x8bdebf);}}else{const _0x4829a7=_0x2d6d82[_0x3179a9-_0x50f52b[_0x3010f8(0x27d)]];this[_0x3010f8(0x23d)](_0x506de3,_0x4829a7,_0x53aa6c,_0x1e3fd4),this[_0x3010f8(0x432)](_0x506de3,_0x4829a7,_0x53aa6c,_0x1e3fd4);}_0x53aa6c+=_0x1945c6;}},Window_Base['prototype']['drawActorStateTurns']=function(_0x285429,_0x20e55d,_0x25d64d,_0xa124e7){const _0x236a5c=_0x5851fa;if(!VisuMZ[_0x236a5c(0x316)]['Settings'][_0x236a5c(0x334)][_0x236a5c(0x313)])return;if(!_0x285429['isStateAffected'](_0x20e55d['id']))return;if(_0x20e55d[_0x236a5c(0x1cd)]===0x0)return;if(_0x20e55d[_0x236a5c(0x433)][_0x236a5c(0x2cc)](/<HIDE STATE TURNS>/i))return;const _0x2e3413=_0x285429['stateTurns'](_0x20e55d['id']),_0x54d557=ImageManager[_0x236a5c(0x357)],_0x301a45=ColorManager['stateColor'](_0x20e55d);this[_0x236a5c(0x444)](_0x301a45),this[_0x236a5c(0x16e)]('rgba(0,\x200,\x200,\x201)'),this[_0x236a5c(0x184)][_0x236a5c(0x174)]=!![],this[_0x236a5c(0x184)][_0x236a5c(0x364)]=VisuMZ['SkillsStatesCore'][_0x236a5c(0x1ad)][_0x236a5c(0x334)][_0x236a5c(0x2a3)],_0x25d64d+=VisuMZ['SkillsStatesCore'][_0x236a5c(0x1ad)][_0x236a5c(0x334)]['TurnOffsetX'],_0xa124e7+=VisuMZ[_0x236a5c(0x316)][_0x236a5c(0x1ad)][_0x236a5c(0x334)]['TurnOffsetY'],this[_0x236a5c(0x44b)](_0x2e3413,_0x25d64d,_0xa124e7,_0x54d557,_0x236a5c(0x349)),this[_0x236a5c(0x184)]['fontBold']=![],this[_0x236a5c(0x161)]();},Window_Base[_0x5851fa(0x2da)]['drawActorStateData']=function(_0x585147,_0x1ff08b,_0x4411af,_0x305b1c){const _0x2992b0=_0x5851fa;if(!VisuMZ[_0x2992b0(0x316)][_0x2992b0(0x1ad)][_0x2992b0(0x334)]['ShowData'])return;const _0x4d7b64=ImageManager[_0x2992b0(0x357)],_0x2ac3ea=ImageManager[_0x2992b0(0x258)]/0x2,_0x40ff39=ColorManager[_0x2992b0(0x215)]();this[_0x2992b0(0x444)](_0x40ff39),this[_0x2992b0(0x16e)](_0x2992b0(0x292)),this[_0x2992b0(0x184)][_0x2992b0(0x174)]=!![],this[_0x2992b0(0x184)][_0x2992b0(0x364)]=VisuMZ[_0x2992b0(0x316)][_0x2992b0(0x1ad)][_0x2992b0(0x334)][_0x2992b0(0x417)],_0x4411af+=VisuMZ[_0x2992b0(0x316)][_0x2992b0(0x1ad)][_0x2992b0(0x334)][_0x2992b0(0x450)],_0x305b1c+=VisuMZ[_0x2992b0(0x316)][_0x2992b0(0x1ad)][_0x2992b0(0x334)][_0x2992b0(0x2d3)];const _0x339fe6=String(_0x585147[_0x2992b0(0x34c)](_0x1ff08b['id']));this[_0x2992b0(0x44b)](_0x339fe6,_0x4411af,_0x305b1c,_0x4d7b64,_0x2992b0(0x361)),this[_0x2992b0(0x184)][_0x2992b0(0x174)]=![],this[_0x2992b0(0x161)]();},Window_Base['prototype'][_0x5851fa(0x23d)]=function(_0x43473a,_0x2b9c01,_0x2bb361,_0x196774){const _0x245b40=_0x5851fa;if(!VisuMZ['SkillsStatesCore'][_0x245b40(0x1ad)][_0x245b40(0x449)]['ShowTurns'])return;const _0x4dd58f=_0x43473a[_0x245b40(0x323)](_0x2b9c01);if(_0x4dd58f===0x0)return;const _0x25221a=_0x43473a[_0x245b40(0x25a)](_0x2b9c01),_0x12f96a=ImageManager[_0x245b40(0x357)],_0x59e616=_0x4dd58f>0x0?ColorManager[_0x245b40(0x211)]():ColorManager[_0x245b40(0x25b)]();this['changeTextColor'](_0x59e616),this[_0x245b40(0x16e)]('rgba(0,\x200,\x200,\x201)'),this[_0x245b40(0x184)][_0x245b40(0x174)]=!![],this[_0x245b40(0x184)]['fontSize']=VisuMZ[_0x245b40(0x316)][_0x245b40(0x1ad)][_0x245b40(0x449)][_0x245b40(0x2a3)],_0x2bb361+=VisuMZ[_0x245b40(0x316)][_0x245b40(0x1ad)][_0x245b40(0x449)][_0x245b40(0x37a)],_0x196774+=VisuMZ[_0x245b40(0x316)]['Settings'][_0x245b40(0x449)][_0x245b40(0x220)],this[_0x245b40(0x44b)](_0x25221a,_0x2bb361,_0x196774,_0x12f96a,_0x245b40(0x349)),this[_0x245b40(0x184)][_0x245b40(0x174)]=![],this[_0x245b40(0x161)]();},Window_Base[_0x5851fa(0x2da)][_0x5851fa(0x432)]=function(_0x16f9f4,_0x3c664d,_0x4c636a,_0x247145){const _0x42bef9=_0x5851fa;if(!VisuMZ['SkillsStatesCore'][_0x42bef9(0x1ad)][_0x42bef9(0x449)]['ShowData'])return;const _0x1742b1=_0x16f9f4['paramBuffRate'](_0x3c664d),_0x405836=_0x16f9f4['buff'](_0x3c664d),_0x485224=ImageManager[_0x42bef9(0x357)],_0x195120=ImageManager[_0x42bef9(0x258)]/0x2,_0x16ca25=_0x405836>0x0?ColorManager[_0x42bef9(0x211)]():ColorManager[_0x42bef9(0x25b)]();this[_0x42bef9(0x444)](_0x16ca25),this[_0x42bef9(0x16e)]('rgba(0,\x200,\x200,\x201)'),this[_0x42bef9(0x184)][_0x42bef9(0x174)]=!![],this[_0x42bef9(0x184)][_0x42bef9(0x364)]=VisuMZ[_0x42bef9(0x316)][_0x42bef9(0x1ad)][_0x42bef9(0x449)][_0x42bef9(0x417)],_0x4c636a+=VisuMZ['SkillsStatesCore'][_0x42bef9(0x1ad)]['Buffs']['DataOffsetX'],_0x247145+=VisuMZ[_0x42bef9(0x316)]['Settings'][_0x42bef9(0x449)][_0x42bef9(0x2d3)];const _0x34502a=_0x42bef9(0x284)[_0x42bef9(0x33f)](Math[_0x42bef9(0x3d3)](_0x1742b1*0x64));this[_0x42bef9(0x44b)](_0x34502a,_0x4c636a,_0x247145,_0x485224,_0x42bef9(0x361)),this[_0x42bef9(0x184)][_0x42bef9(0x174)]=![],this['resetFontSettings']();},VisuMZ[_0x5851fa(0x316)]['Window_StatusBase_placeGauge']=Window_StatusBase[_0x5851fa(0x2da)][_0x5851fa(0x1d3)],Window_StatusBase['prototype'][_0x5851fa(0x1d3)]=function(_0x331ada,_0x3e7526,_0x32ae55,_0x3c9893){const _0xeab116=_0x5851fa;if(_0x331ada['isActor']())_0x3e7526=this['convertGaugeTypeSkillsStatesCore'](_0x331ada,_0x3e7526);this[_0xeab116(0x41b)](_0x331ada,_0x3e7526,_0x32ae55,_0x3c9893);},Window_StatusBase[_0x5851fa(0x2da)][_0x5851fa(0x41b)]=function(_0x728aa5,_0x4305af,_0x8f026a,_0x11499b){const _0x3394da=_0x5851fa;if([_0x3394da(0x3e6),_0x3394da(0x382)]['includes'](_0x4305af['toLowerCase']()))return;VisuMZ[_0x3394da(0x316)][_0x3394da(0x180)]['call'](this,_0x728aa5,_0x4305af,_0x8f026a,_0x11499b);},Window_StatusBase['prototype'][_0x5851fa(0x182)]=function(_0x1945ce,_0x3eebfe){const _0x241a4b=_0x5851fa,_0x41869e=_0x1945ce[_0x241a4b(0x188)]()[_0x241a4b(0x433)];if(_0x3eebfe==='hp'&&_0x41869e[_0x241a4b(0x2cc)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x3eebfe==='mp'&&_0x41869e[_0x241a4b(0x2cc)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x3eebfe==='tp'&&_0x41869e[_0x241a4b(0x2cc)](/<REPLACE TP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x241a4b(0x3c6)!==_0x241a4b(0x3c6)){if(!_0x436354['value'](_0x25d8f6))return![];}else return _0x3eebfe;}}}},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x2df)]=Window_StatusBase[_0x5851fa(0x2da)][_0x5851fa(0x1d2)],Window_StatusBase[_0x5851fa(0x2da)]['drawActorIcons']=function(_0x30cd35,_0x3cd645,_0x573d09,_0x2b8610){const _0xdaff08=_0x5851fa;if(!_0x30cd35)return;Window_Base[_0xdaff08(0x2da)][_0xdaff08(0x1d2)][_0xdaff08(0x1c1)](this,_0x30cd35,_0x3cd645,_0x573d09,_0x2b8610);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x264)]=Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x40d)],Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x40d)]=function(_0x3ecf95){const _0x5204cb=_0x5851fa;VisuMZ[_0x5204cb(0x316)]['Window_SkillType_initialize']['call'](this,_0x3ecf95),this[_0x5204cb(0x193)](_0x3ecf95);},Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x193)]=function(_0x150d9c){const _0x57cae6=_0x5851fa,_0xe9fe8=new Rectangle(0x0,0x0,_0x150d9c[_0x57cae6(0x3cf)],_0x150d9c[_0x57cae6(0x378)]);this[_0x57cae6(0x15d)]=new Window_Base(_0xe9fe8),this[_0x57cae6(0x15d)]['opacity']=0x0,this[_0x57cae6(0x21f)](this[_0x57cae6(0x15d)]),this['updateCommandNameWindow']();},Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x1b8)]=function(){const _0x5bfc9f=_0x5851fa;Window_Command['prototype'][_0x5bfc9f(0x1b8)][_0x5bfc9f(0x1c1)](this);if(this[_0x5bfc9f(0x15d)])this[_0x5bfc9f(0x1ce)]();},Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x1ce)]=function(){const _0x5b2fb8=_0x5851fa,_0x5a0e0a=this[_0x5b2fb8(0x15d)];_0x5a0e0a['contents'][_0x5b2fb8(0x1c5)]();const _0x4e4ad1=this['commandStyleCheck'](this[_0x5b2fb8(0x266)]());if(_0x4e4ad1===_0x5b2fb8(0x19b)&&this['maxItems']()>0x0){if(_0x5b2fb8(0x3b6)!==_0x5b2fb8(0x3b6)){const _0x9bb110=_0x5cad81[_0x5b2fb8(0x312)]('['+_0x4864b3['$1'][_0x5b2fb8(0x2cc)](/\d+/g)+']');for(const _0x19bce4 of _0x9bb110){if(!_0x45ee00[_0x5b2fb8(0x36d)](_0x19bce4))return!![];}return![];}else{const _0x21c768=this[_0x5b2fb8(0x3d7)](this[_0x5b2fb8(0x266)]());let _0x282514=this['commandName'](this['index']());_0x282514=_0x282514[_0x5b2fb8(0x26c)](/\\I\[(\d+)\]/gi,''),_0x5a0e0a[_0x5b2fb8(0x161)](),this[_0x5b2fb8(0x1c3)](_0x282514,_0x21c768),this[_0x5b2fb8(0x1eb)](_0x282514,_0x21c768),this[_0x5b2fb8(0x18f)](_0x282514,_0x21c768);}}},Window_SkillType['prototype'][_0x5851fa(0x1c3)]=function(_0x2725f,_0x512644){},Window_SkillType['prototype']['commandNameWindowDrawText']=function(_0x3d2a6a,_0x3c894f){const _0x5a8348=_0x5851fa,_0x14d0e3=this[_0x5a8348(0x15d)];_0x14d0e3[_0x5a8348(0x44b)](_0x3d2a6a,0x0,_0x3c894f['y'],_0x14d0e3[_0x5a8348(0x370)],_0x5a8348(0x361));},Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x18f)]=function(_0x49504a,_0x510586){const _0x462800=_0x5851fa,_0x5db29f=this[_0x462800(0x15d)],_0x20df11=$gameSystem[_0x462800(0x2ae)](),_0x51125d=_0x510586['x']+Math[_0x462800(0x3a4)](_0x510586[_0x462800(0x3cf)]/0x2)+_0x20df11;_0x5db29f['x']=_0x5db29f[_0x462800(0x3cf)]/-0x2+_0x51125d,_0x5db29f['y']=Math['floor'](_0x510586[_0x462800(0x378)]/0x2);},Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x404)]=function(){const _0x5de655=_0x5851fa;return Imported[_0x5de655(0x177)]&&Window_Command[_0x5de655(0x2da)][_0x5de655(0x404)][_0x5de655(0x1c1)](this);},Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x22b)]=function(){const _0x1f4235=_0x5851fa;if(!this[_0x1f4235(0x2cf)])return;const _0x3aa049=this['_actor'][_0x1f4235(0x162)]();for(const _0x1fef8d of _0x3aa049){const _0x4e4c05=this['makeCommandName'](_0x1fef8d);this[_0x1f4235(0x15a)](_0x4e4c05,_0x1f4235(0x3a8),!![],_0x1fef8d);}},Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x438)]=function(_0x1baa0f){const _0x4e1658=_0x5851fa;let _0x2a2264=$dataSystem[_0x4e1658(0x162)][_0x1baa0f];if(_0x2a2264[_0x4e1658(0x2cc)](/\\I\[(\d+)\]/i))return _0x2a2264;if(this[_0x4e1658(0x1c4)]()===_0x4e1658(0x1fd))return _0x2a2264;const _0x10d1a2=VisuMZ[_0x4e1658(0x316)][_0x4e1658(0x1ad)][_0x4e1658(0x26b)],_0x57db1f=$dataSystem['magicSkills'][_0x4e1658(0x25f)](_0x1baa0f),_0x61cf3a=_0x57db1f?_0x10d1a2['IconStypeMagic']:_0x10d1a2['IconStypeNorm'];return'\x5cI[%1]%2'[_0x4e1658(0x33f)](_0x61cf3a,_0x2a2264);},Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x452)]=function(){const _0x46a732=_0x5851fa;return VisuMZ[_0x46a732(0x316)][_0x46a732(0x1ad)][_0x46a732(0x26b)]['CmdTextAlign'];},Window_SkillType['prototype']['drawItem']=function(_0x4b1bb4){const _0x2f99da=_0x5851fa,_0x26c321=this['commandStyleCheck'](_0x4b1bb4);if(_0x26c321===_0x2f99da(0x287))this[_0x2f99da(0x2e4)](_0x4b1bb4);else{if(_0x26c321===_0x2f99da(0x19b)){if(_0x2f99da(0x24b)!=='MyIjo')this[_0x2f99da(0x218)](_0x4b1bb4);else return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x2f99da(0x212)]():_0x1d4e7d['SkillsStatesCore']['Scene_Skill_statusWindowRect'][_0x2f99da(0x1c1)](this);}else Window_Command['prototype'][_0x2f99da(0x1d7)][_0x2f99da(0x1c1)](this,_0x4b1bb4);}},Window_SkillType['prototype'][_0x5851fa(0x1c4)]=function(){const _0x44efe1=_0x5851fa;return VisuMZ['SkillsStatesCore'][_0x44efe1(0x1ad)]['Skills'][_0x44efe1(0x354)];},Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x1de)]=function(_0x41219e){const _0x1b7350=_0x5851fa;if(_0x41219e<0x0)return'text';const _0x25db2e=this['commandStyle']();if(_0x25db2e!==_0x1b7350(0x406))return _0x25db2e;else{if(this['maxItems']()>0x0){if(_0x1b7350(0x1c2)!==_0x1b7350(0x168)){const _0x367c01=this[_0x1b7350(0x2ea)](_0x41219e);if(_0x367c01[_0x1b7350(0x2cc)](/\\I\[(\d+)\]/i)){const _0x3b687d=this[_0x1b7350(0x3d7)](_0x41219e),_0x14c2fb=this[_0x1b7350(0x1f9)](_0x367c01)[_0x1b7350(0x3cf)];return _0x14c2fb<=_0x3b687d[_0x1b7350(0x3cf)]?_0x1b7350(0x287):_0x1b7350(0x19b);}}else{if(_0x4ab17e[_0x1b7350(0x297)]())_0x60047c[_0x1b7350(0x32f)](_0x59515d);}}}return'text';},Window_SkillType[_0x5851fa(0x2da)][_0x5851fa(0x2e4)]=function(_0x5ea5fb){const _0x3e2222=_0x5851fa,_0x29a3e3=this[_0x3e2222(0x3d7)](_0x5ea5fb),_0x307421=this[_0x3e2222(0x2ea)](_0x5ea5fb),_0x4c35f1=this[_0x3e2222(0x1f9)](_0x307421)[_0x3e2222(0x3cf)];this[_0x3e2222(0x2e5)](this[_0x3e2222(0x3a3)](_0x5ea5fb));const _0x3cb97f=this[_0x3e2222(0x452)]();if(_0x3cb97f==='right')this[_0x3e2222(0x351)](_0x307421,_0x29a3e3['x']+_0x29a3e3[_0x3e2222(0x3cf)]-_0x4c35f1,_0x29a3e3['y'],_0x4c35f1);else{if(_0x3cb97f==='center'){const _0x855ab8=_0x29a3e3['x']+Math[_0x3e2222(0x3a4)]((_0x29a3e3[_0x3e2222(0x3cf)]-_0x4c35f1)/0x2);this[_0x3e2222(0x351)](_0x307421,_0x855ab8,_0x29a3e3['y'],_0x4c35f1);}else this[_0x3e2222(0x351)](_0x307421,_0x29a3e3['x'],_0x29a3e3['y'],_0x4c35f1);}},Window_SkillType[_0x5851fa(0x2da)]['drawItemStyleIcon']=function(_0x21d143){const _0x32288e=_0x5851fa;this[_0x32288e(0x2ea)](_0x21d143)[_0x32288e(0x2cc)](/\\I\[(\d+)\]/i);const _0x3a9b80=Number(RegExp['$1'])||0x0,_0x23ca52=this['itemLineRect'](_0x21d143),_0x2d49a0=_0x23ca52['x']+Math[_0x32288e(0x3a4)]((_0x23ca52['width']-ImageManager[_0x32288e(0x357)])/0x2),_0x2dbc73=_0x23ca52['y']+(_0x23ca52['height']-ImageManager['iconHeight'])/0x2;this[_0x32288e(0x253)](_0x3a9b80,_0x2d49a0,_0x2dbc73);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x1f1)]=Window_SkillStatus[_0x5851fa(0x2da)][_0x5851fa(0x2c4)],Window_SkillStatus[_0x5851fa(0x2da)][_0x5851fa(0x2c4)]=function(){const _0x830ab7=_0x5851fa;VisuMZ[_0x830ab7(0x316)][_0x830ab7(0x1f1)][_0x830ab7(0x1c1)](this);if(this[_0x830ab7(0x2cf)])this[_0x830ab7(0x3d5)]();},Window_SkillStatus[_0x5851fa(0x2da)][_0x5851fa(0x3d5)]=function(){const _0x109890=_0x5851fa;if(!Imported[_0x109890(0x177)])return;if(!Imported['VisuMZ_1_MainMenuCore'])return;const _0x43f64a=this['gaugeLineHeight']();let _0x10b8ff=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x449a27=this[_0x109890(0x370)]-_0x10b8ff-0x2;if(_0x449a27>=0x12c){const _0x1b9124=VisuMZ[_0x109890(0x158)][_0x109890(0x1ad)]['Param'][_0x109890(0x2b7)],_0x138f80=Math[_0x109890(0x3a4)](_0x449a27/0x2)-0x18;let _0x1c9507=_0x10b8ff,_0x4368ac=Math[_0x109890(0x3a4)]((this[_0x109890(0x1aa)]-Math[_0x109890(0x2cd)](_0x1b9124['length']/0x2)*_0x43f64a)/0x2),_0x13b613=0x0;for(const _0x5d9677 of _0x1b9124){if('VLczG'===_0x109890(0x373)){const _0x248486='_stored_debuffColor';this[_0x109890(0x3fa)]=this['_colorCache']||{};if(this['_colorCache'][_0x248486])return this['_colorCache'][_0x248486];const _0x2089c5=_0x292305[_0x109890(0x316)][_0x109890(0x1ad)][_0x109890(0x449)][_0x109890(0x1b5)];return this[_0x109890(0x2de)](_0x248486,_0x2089c5);}else this[_0x109890(0x27c)](_0x1c9507,_0x4368ac,_0x138f80,_0x5d9677),_0x13b613++,_0x13b613%0x2===0x0?_0x109890(0x371)!==_0x109890(0x371)?this[_0x109890(0x2e4)](_0x146d5c):(_0x1c9507=_0x10b8ff,_0x4368ac+=_0x43f64a):_0x1c9507+=_0x138f80+0x18;}}this[_0x109890(0x161)]();},Window_SkillStatus[_0x5851fa(0x2da)][_0x5851fa(0x27c)]=function(_0x1bad4c,_0x36fdba,_0x5bb6e7,_0x2db210){const _0x418eb4=_0x5851fa,_0x78785d=this[_0x418eb4(0x3ad)]();this[_0x418eb4(0x161)](),this[_0x418eb4(0x1da)](_0x1bad4c,_0x36fdba,_0x5bb6e7,_0x2db210,!![]),this[_0x418eb4(0x33c)](),this[_0x418eb4(0x184)][_0x418eb4(0x364)]-=0x8;const _0x2bb4f7=this[_0x418eb4(0x2cf)][_0x418eb4(0x1a3)](_0x2db210,!![]);this[_0x418eb4(0x184)][_0x418eb4(0x44b)](_0x2bb4f7,_0x1bad4c,_0x36fdba,_0x5bb6e7,_0x78785d,_0x418eb4(0x349));},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x20d)]=Window_SkillList['prototype'][_0x5851fa(0x25f)],Window_SkillList[_0x5851fa(0x2da)][_0x5851fa(0x25f)]=function(_0x83a828){const _0xdbc0f7=_0x5851fa;return this[_0xdbc0f7(0x35b)](_0x83a828);},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x166)]=Window_SkillList[_0x5851fa(0x2da)][_0x5851fa(0x1fa)],Window_SkillList[_0x5851fa(0x2da)][_0x5851fa(0x1fa)]=function(){const _0x32ebbc=_0x5851fa;if(SceneManager['_scene'][_0x32ebbc(0x2f3)]===Scene_Battle){if('VDEBz'!==_0x32ebbc(0x431))return VisuMZ['SkillsStatesCore'][_0x32ebbc(0x166)]['call'](this);else _0x517977[_0x460cf8][_0x57bad6]&&_0x23d085[_0x342680][_0x3a9176][_0x32ebbc(0x1c1)](this,_0x4bbb37);}else return VisuMZ['SkillsStatesCore']['Settings'][_0x32ebbc(0x26b)][_0x32ebbc(0x320)];},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x1bd)]=Window_SkillList[_0x5851fa(0x2da)][_0x5851fa(0x3fc)],Window_SkillList['prototype']['setActor']=function(_0x262050){const _0x587469=_0x5851fa,_0x388b97=this[_0x587469(0x2cf)]!==_0x262050;VisuMZ[_0x587469(0x316)]['Window_SkillList_setActor'][_0x587469(0x1c1)](this,_0x262050);if(_0x388b97){if(_0x587469(0x439)===_0x587469(0x439))this[_0x587469(0x3c7)]&&this['_statusWindow'][_0x587469(0x2f3)]===Window_ShopStatus&&(_0x587469(0x41a)==='Szoly'?this[_0x587469(0x3c7)][_0x587469(0x1e6)](this[_0x587469(0x32b)](0x0)):this[_0x587469(0x3c7)][_0x587469(0x1e6)](this[_0x587469(0x1c9)]()));else return this[_0x587469(0x238)][_0x56663e]===_0x20dadb[_0x587469(0x316)][_0x587469(0x1ad)][_0x587469(0x449)][_0x587469(0x2d8)];}},Window_SkillList['prototype']['setStypeId']=function(_0x3f4da2){const _0x143c6a=_0x5851fa;if(this[_0x143c6a(0x302)]===_0x3f4da2)return;this['_stypeId']=_0x3f4da2,this[_0x143c6a(0x2c4)](),this[_0x143c6a(0x365)](0x0,0x0);if(this[_0x143c6a(0x3c7)]&&this['_statusWindow'][_0x143c6a(0x2f3)]===Window_ShopStatus){if(_0x143c6a(0x21b)!==_0x143c6a(0x21b)){const _0x54fd7f=_0x5ad79c['CalcJS'][_0x143c6a(0x1c1)](this,_0x3c161f);_0x54c656['PayJS'][_0x143c6a(0x1c1)](this,_0x9bb95,_0x54fd7f);}else this[_0x143c6a(0x3c7)][_0x143c6a(0x1e6)](this[_0x143c6a(0x32b)](0x0));}},Window_SkillList['prototype'][_0x5851fa(0x35b)]=function(_0x568574){const _0x7b096a=_0x5851fa;if(!_0x568574)return VisuMZ['SkillsStatesCore'][_0x7b096a(0x20d)]['call'](this,_0x568574);if(!this[_0x7b096a(0x32a)](_0x568574))return![];if(!this['checkShowHideNotetags'](_0x568574))return![];if(!this[_0x7b096a(0x179)](_0x568574))return![];return!![];},Window_SkillList['prototype'][_0x5851fa(0x32a)]=function(_0x19c48c){const _0x2ae4c3=_0x5851fa;return DataManager[_0x2ae4c3(0x2fd)](_0x19c48c)[_0x2ae4c3(0x25f)](this['_stypeId']);},Window_SkillList[_0x5851fa(0x2da)]['checkShowHideNotetags']=function(_0x32684b){const _0x3844db=_0x5851fa;if(!VisuMZ[_0x3844db(0x316)][_0x3844db(0x173)](this[_0x3844db(0x2cf)],_0x32684b))return![];if(!VisuMZ[_0x3844db(0x316)][_0x3844db(0x1fc)](this[_0x3844db(0x2cf)],_0x32684b))return![];if(!VisuMZ[_0x3844db(0x316)][_0x3844db(0x200)](this[_0x3844db(0x2cf)],_0x32684b))return![];return!![];},VisuMZ['SkillsStatesCore'][_0x5851fa(0x173)]=function(_0x2cde40,_0x1cb12f){const _0x75b65a=_0x5851fa,_0x19e93d=_0x1cb12f[_0x75b65a(0x433)];if(_0x19e93d[_0x75b65a(0x2cc)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x75b65a(0x345)]())return![];else return _0x19e93d['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()?![]:!![];},VisuMZ['SkillsStatesCore'][_0x5851fa(0x1fc)]=function(_0x13df74,_0x3aa48c){const _0x11c6a3=_0x5851fa,_0x1b8dc0=_0x3aa48c[_0x11c6a3(0x433)];if(_0x1b8dc0[_0x11c6a3(0x2cc)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xfd7125=JSON[_0x11c6a3(0x312)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x21d630 of _0xfd7125){if(!$gameSwitches[_0x11c6a3(0x22e)](_0x21d630))return![];}return!![];}if(_0x1b8dc0[_0x11c6a3(0x2cc)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32f26d=JSON[_0x11c6a3(0x312)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xffd9dc of _0x32f26d){if(_0x11c6a3(0x28b)==='uVZeK'){if(!$gameSwitches['value'](_0xffd9dc))return![];}else this[_0x11c6a3(0x2d7)]=this[_0x11c6a3(0x2d7)]||{},_0x482403[_0x11c6a3(0x2da)][_0x11c6a3(0x34d)][_0x11c6a3(0x1c1)](this);}return!![];}if(_0x1b8dc0['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1f79c3=JSON[_0x11c6a3(0x312)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x545c20 of _0x1f79c3){if($gameSwitches['value'](_0x545c20))return!![];}return![];}if(_0x1b8dc0[_0x11c6a3(0x2cc)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x503b1f=JSON[_0x11c6a3(0x312)]('['+RegExp['$1'][_0x11c6a3(0x2cc)](/\d+/g)+']');for(const _0x5b3393 of _0x503b1f){if(!$gameSwitches[_0x11c6a3(0x22e)](_0x5b3393))return!![];}return![];}if(_0x1b8dc0[_0x11c6a3(0x2cc)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x26585e=JSON[_0x11c6a3(0x312)]('['+RegExp['$1'][_0x11c6a3(0x2cc)](/\d+/g)+']');for(const _0xa87eec of _0x26585e){if(_0x11c6a3(0x322)===_0x11c6a3(0x346)){const _0x54dec7=_0xadd270['SkillsStatesCore']['Sprite_Gauge_gaugeRate']['call'](this);return _0x54dec7[_0x11c6a3(0x2e7)](0x0,0x1);}else{if(!$gameSwitches[_0x11c6a3(0x22e)](_0xa87eec))return!![];}}return![];}if(_0x1b8dc0['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ad49f=JSON[_0x11c6a3(0x312)]('['+RegExp['$1'][_0x11c6a3(0x2cc)](/\d+/g)+']');for(const _0x43f5a5 of _0x4ad49f){if(_0x11c6a3(0x405)!==_0x11c6a3(0x281)){if($gameSwitches['value'](_0x43f5a5))return![];}else{const _0x357398=this[_0x11c6a3(0x1c9)]()[_0x11c6a3(0x433)];if(_0x357398['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x30763a=_0x5c5fd4(_0xbc9c9['$1']);if(_0x31a33d[_0x11c6a3(0x3ff)](_0x30763a))return!![];}if(_0x357398[_0x11c6a3(0x2cc)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x5cbc26=_0x4d8c45(_0x2b9234['$1']);if(_0x12cf5f['isStateAffected'](_0x5cbc26))return!![];}else{if(_0x357398['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x205a79=_0x49b560['getStateIdWithName'](_0x4688c9['$1']);if(_0x3b4870['isStateAffected'](_0x205a79))return!![];}}return![];}}return!![];}return!![];},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x200)]=function(_0x562952,_0x1b9356){const _0x4ed7c1=_0x5851fa,_0x339b49=_0x1b9356['note'];if(_0x339b49['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4ed7c1(0x356)!==_0x4ed7c1(0x356)){const _0x1c4a7c=_0x3b995e(_0x456bff['$1']),_0x3324ef=_0xa97e2c[_0x4ed7c1(0x33f)](_0x1c4a7c);_0x96125[_0x4ed7c1(0x316)][_0x4ed7c1(0x21d)][_0x10fc12['id']]=new _0x43d4c0(_0x4ed7c1(0x2e9),_0x3324ef);}else{const _0x4923dd=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xe3f6fb of _0x4923dd){if(!_0x562952[_0x4ed7c1(0x36d)](_0xe3f6fb))return![];}return!![];}}else{if(_0x339b49[_0x4ed7c1(0x2cc)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5b55c7=RegExp['$1'][_0x4ed7c1(0x388)](',');for(const _0x3a9ca4 of _0x5b55c7){const _0x2ff6d9=DataManager[_0x4ed7c1(0x235)](_0x3a9ca4);if(!_0x2ff6d9)continue;if(!_0x562952[_0x4ed7c1(0x36d)](_0x2ff6d9))return![];}return!![];}}if(_0x339b49[_0x4ed7c1(0x2cc)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('YQIGr'===_0x4ed7c1(0x434))_0x23d6c8[_0x4ed7c1(0x316)]['Game_Battler_addDebuff'][_0x4ed7c1(0x1c1)](this,_0x1f8eb3,_0x4fa447),this[_0x4ed7c1(0x31e)](_0x3329f0)&&this[_0x4ed7c1(0x325)](_0x4fd4ed,_0x4fc44d);else{const _0x24caf1=JSON[_0x4ed7c1(0x312)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2bb17a of _0x24caf1){if(!_0x562952[_0x4ed7c1(0x36d)](_0x2bb17a))return![];}return!![];}}else{if(_0x339b49[_0x4ed7c1(0x2cc)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xf0e2fd=RegExp['$1'][_0x4ed7c1(0x388)](',');for(const _0x4dd7b5 of _0xf0e2fd){const _0x56fc30=DataManager['getSkillIdWithName'](_0x4dd7b5);if(!_0x56fc30)continue;if(!_0x562952[_0x4ed7c1(0x36d)](_0x56fc30))return![];}return!![];}}if(_0x339b49[_0x4ed7c1(0x2cc)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4ed7c1(0x1a4)!=='GXBNW'){const _0x1fcd3e=_0x18215e(_0x1eb6da['$1']),_0x2a1829=_0x4ed7c1(0x3d9)['format'](_0x1fcd3e);_0x246552[_0x4ed7c1(0x316)]['skillEnableJS'][_0x2cb6f0['id']]=new _0x7d91b6('skill',_0x2a1829);}else{const _0x1d6eeb=JSON[_0x4ed7c1(0x312)]('['+RegExp['$1'][_0x4ed7c1(0x2cc)](/\d+/g)+']');for(const _0x2ed3cb of _0x1d6eeb){if(_0x562952['isLearnedSkill'](_0x2ed3cb))return!![];}return![];}}else{if(_0x339b49[_0x4ed7c1(0x2cc)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x4ed7c1(0x1e5)!==_0x4ed7c1(0x42a)){const _0x9086f=RegExp['$1'][_0x4ed7c1(0x388)](',');for(const _0x2aedc6 of _0x9086f){if('qmCUQ'===_0x4ed7c1(0x2f4)){const _0xc8dd1d=DataManager[_0x4ed7c1(0x235)](_0x2aedc6);if(!_0xc8dd1d)continue;if(_0x562952[_0x4ed7c1(0x36d)](_0xc8dd1d))return!![];}else return this[_0x4ed7c1(0x262)](_0x337f21)>0x0;}return![];}else return _0x76ab27[_0x4ed7c1(0x316)][_0x4ed7c1(0x35e)]['call'](this);}}if(_0x339b49[_0x4ed7c1(0x2cc)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x335260=JSON[_0x4ed7c1(0x312)]('['+RegExp['$1'][_0x4ed7c1(0x2cc)](/\d+/g)+']');for(const _0x26f4f7 of _0x335260){if(!_0x562952['isLearnedSkill'](_0x26f4f7))return!![];}return![];}else{if(_0x339b49['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x4ed7c1(0x383)!==_0x4ed7c1(0x383))this[_0x4ed7c1(0x203)](_0x131959,_0x1edb0e,_0x521dc9,_0x1c4ba4);else{const _0x574610=RegExp['$1']['split'](',');for(const _0x44525c of _0x574610){if(_0x4ed7c1(0x2db)!==_0x4ed7c1(0x2bf)){const _0x2b71f2=DataManager[_0x4ed7c1(0x235)](_0x44525c);if(!_0x2b71f2)continue;if(!_0x562952[_0x4ed7c1(0x36d)](_0x2b71f2))return!![];}else{if(typeof _0x39a3c0!=='number')_0x28bbf5=_0x5d2420['id'];return this[_0x4ed7c1(0x2fe)]=this['_stateData']||{},this[_0x4ed7c1(0x2fe)][_0x206996]=this[_0x4ed7c1(0x2fe)][_0x55d059]||{},this['_stateData'][_0x575bc5];}}return![];}}}if(_0x339b49[_0x4ed7c1(0x2cc)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x22047b=JSON['parse']('['+RegExp['$1'][_0x4ed7c1(0x2cc)](/\d+/g)+']');for(const _0x2ec1e7 of _0x22047b){if('Dqmbz'===_0x4ed7c1(0x44f)){const _0x9241be=_0x155976[_0x4ed7c1(0x312)]('['+_0x308658['$1'][_0x4ed7c1(0x2cc)](/\d+/g)+']');for(const _0x176896 of _0x9241be){if(!_0x3f7149[_0x4ed7c1(0x31c)](_0x176896))return!![];}return![];}else{if(!_0x562952[_0x4ed7c1(0x36d)](_0x2ec1e7))return!![];}}return![];}else{if(_0x339b49[_0x4ed7c1(0x2cc)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x33ae90=RegExp['$1'][_0x4ed7c1(0x388)](',');for(const _0x2b9b8b of _0x33ae90){const _0x15ebf7=DataManager[_0x4ed7c1(0x235)](_0x2b9b8b);if(!_0x15ebf7)continue;if(!_0x562952['isLearnedSkill'](_0x15ebf7))return!![];}return![];}}if(_0x339b49[_0x4ed7c1(0x2cc)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x501fd5=JSON['parse']('['+RegExp['$1'][_0x4ed7c1(0x2cc)](/\d+/g)+']');for(const _0xf20b04 of _0x501fd5){if('oqUgj'==='oqUgj'){if(_0x562952[_0x4ed7c1(0x36d)](_0xf20b04))return![];}else return 0x0;}return!![];}else{if(_0x339b49['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x4ed7c1(0x38c)==='DdbsU'){const _0x506c08=RegExp['$1'][_0x4ed7c1(0x388)](',');for(const _0x2353dd of _0x506c08){if('gYXAi'===_0x4ed7c1(0x1bb))for(_0x156228 of _0x528219[_0x4ed7c1(0x316)]['Settings'][_0x4ed7c1(0x241)]){const _0x31a3f7=_0xab912c[_0x4ed7c1(0x385)][_0x4ed7c1(0x1c1)](this,_0x4f3edb);_0x25cd94[_0x4ed7c1(0x2ce)][_0x4ed7c1(0x1c1)](this,_0x400dca,_0x31a3f7);}else{const _0x5b27cf=DataManager['getSkillIdWithName'](_0x2353dd);if(!_0x5b27cf)continue;if(_0x562952[_0x4ed7c1(0x36d)](_0x5b27cf))return![];}}return!![];}else{const _0x496da6=_0x3e04c5(_0x2a4c11['$1']),_0x78ed35=_0x27a90f[_0x4ed7c1(0x33f)](_0x496da6,'heal',0x1,_0x4ed7c1(0x305));_0x1125dc[_0x4ed7c1(0x316)][_0x4ed7c1(0x1d8)][_0xf435f['id']]=new _0x166e18(_0x4ed7c1(0x2e9),_0x78ed35);}}}if(_0x339b49[_0x4ed7c1(0x2cc)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('OshtC'===_0x4ed7c1(0x3aa)){const _0x805fd6=JSON[_0x4ed7c1(0x312)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5cf82c of _0x805fd6){if(!_0x562952[_0x4ed7c1(0x31c)](_0x5cf82c))return![];}return!![];}else{_0x187407['match'](_0x483d01);const _0x2ef0d7=_0x23d29d(_0x508847['$1'])[_0x4ed7c1(0x388)](',')[_0x4ed7c1(0x195)](_0x287fad=>_0x2686f4(_0x287fad)[_0x4ed7c1(0x42c)]()[_0x4ed7c1(0x206)]());_0x1eae0e=_0xdd0919[_0x4ed7c1(0x3af)](_0x2ef0d7);}}else{if(_0x339b49[_0x4ed7c1(0x2cc)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x486320=RegExp['$1'][_0x4ed7c1(0x388)](',');for(const _0x5449bb of _0x486320){const _0x3d8152=DataManager[_0x4ed7c1(0x235)](_0x5449bb);if(!_0x3d8152)continue;if(!_0x562952[_0x4ed7c1(0x31c)](_0x3d8152))return![];}return!![];}}if(_0x339b49[_0x4ed7c1(0x2cc)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e3634=JSON[_0x4ed7c1(0x312)]('['+RegExp['$1'][_0x4ed7c1(0x2cc)](/\d+/g)+']');for(const _0x7f8b9a of _0x2e3634){if(!_0x562952['hasSkill'](_0x7f8b9a))return![];}return!![];}else{if(_0x339b49[_0x4ed7c1(0x2cc)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x28e110=RegExp['$1'][_0x4ed7c1(0x388)](',');for(const _0x112d79 of _0x28e110){if(_0x4ed7c1(0x2e2)===_0x4ed7c1(0x2e2)){const _0x4b5f08=DataManager[_0x4ed7c1(0x235)](_0x112d79);if(!_0x4b5f08)continue;if(!_0x562952[_0x4ed7c1(0x31c)](_0x4b5f08))return![];}else{if(!_0x56e73a['SkillsStatesCore']['Settings'][_0x4ed7c1(0x449)][_0x4ed7c1(0x313)])return;const _0x3737a9=_0x10784e[_0x4ed7c1(0x323)](_0x4a029f);if(_0x3737a9===0x0)return;const _0x113498=_0x39dfe1[_0x4ed7c1(0x25a)](_0x2a0100),_0x149cea=_0x32d4af[_0x4ed7c1(0x357)],_0x9c47af=_0x3737a9>0x0?_0x103a48['buffColor']():_0xd548b4[_0x4ed7c1(0x25b)]();this[_0x4ed7c1(0x444)](_0x9c47af),this[_0x4ed7c1(0x16e)]('rgba(0,\x200,\x200,\x201)'),this[_0x4ed7c1(0x184)][_0x4ed7c1(0x174)]=!![],this[_0x4ed7c1(0x184)]['fontSize']=_0x16b1d4[_0x4ed7c1(0x316)]['Settings'][_0x4ed7c1(0x449)][_0x4ed7c1(0x2a3)],_0x4d9ddb+=_0x4950e3[_0x4ed7c1(0x316)][_0x4ed7c1(0x1ad)][_0x4ed7c1(0x449)][_0x4ed7c1(0x37a)],_0x11852b+=_0x173c61['SkillsStatesCore'][_0x4ed7c1(0x1ad)][_0x4ed7c1(0x449)][_0x4ed7c1(0x220)],this[_0x4ed7c1(0x44b)](_0x113498,_0x271303,_0x46a2a5,_0x149cea,_0x4ed7c1(0x349)),this[_0x4ed7c1(0x184)][_0x4ed7c1(0x174)]=![],this[_0x4ed7c1(0x161)]();}}return!![];}}if(_0x339b49[_0x4ed7c1(0x2cc)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x225fe3=JSON[_0x4ed7c1(0x312)]('['+RegExp['$1'][_0x4ed7c1(0x2cc)](/\d+/g)+']');for(const _0xd5db16 of _0x225fe3){if(_0x4ed7c1(0x29a)!==_0x4ed7c1(0x29a)){const _0x164021=_0xa00a82(_0x20d058['$1']);if(_0x1b5f6a['isStateAffected'](_0x164021))return!![];}else{if(_0x562952['hasSkill'](_0xd5db16))return!![];}}return![];}else{if(_0x339b49['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x336076=RegExp['$1'][_0x4ed7c1(0x388)](',');for(const _0x5d04cc of _0x336076){const _0x1e88a4=DataManager[_0x4ed7c1(0x235)](_0x5d04cc);if(!_0x1e88a4)continue;if(_0x562952[_0x4ed7c1(0x31c)](_0x1e88a4))return!![];}return![];}}if(_0x339b49[_0x4ed7c1(0x2cc)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11c64f=JSON[_0x4ed7c1(0x312)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x181757 of _0x11c64f){if(!_0x562952[_0x4ed7c1(0x31c)](_0x181757))return!![];}return![];}else{if(_0x339b49[_0x4ed7c1(0x2cc)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x10a745=RegExp['$1'][_0x4ed7c1(0x388)](',');for(const _0x1efb25 of _0x10a745){if(_0x4ed7c1(0x249)==='jbpBA'){const _0x168614=this[_0x4ed7c1(0x18d)](_0x579603);_0x3e53c4[_0x4ed7c1(0x316)]['Game_Battler_addState']['call'](this,_0xf99cf0);if(_0x168614&&this[_0x4ed7c1(0x2af)](_0x11582c[_0x25cbaa])){this[_0x4ed7c1(0x186)](_0x3a733b);;}}else{const _0x16f11c=DataManager[_0x4ed7c1(0x235)](_0x1efb25);if(!_0x16f11c)continue;if(!_0x562952[_0x4ed7c1(0x31c)](_0x16f11c))return!![];}}return![];}}if(_0x339b49[_0x4ed7c1(0x2cc)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1202a1=JSON['parse']('['+RegExp['$1'][_0x4ed7c1(0x2cc)](/\d+/g)+']');for(const _0x51363c of _0x1202a1){if(_0x4ed7c1(0x265)!==_0x4ed7c1(0x303)){if(!_0x562952['hasSkill'](_0x51363c))return!![];}else{if(!_0x167825[_0x4ed7c1(0x22e)](_0x430715))return!![];}}return![];}else{if(_0x339b49[_0x4ed7c1(0x2cc)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x4ed7c1(0x217)===_0x4ed7c1(0x39e)){_0xe264db[_0x4ed7c1(0x2cc)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x4dc1f9=_0x3a1535(_0x48190b['$1']),_0x30ec33=_0x427516(_0x153d2e['$2']);_0x4ad1e3['removeStatesByCategory'](_0x4dc1f9,_0x30ec33);}else{const _0x1649d5=RegExp['$1'][_0x4ed7c1(0x388)](',');for(const _0x159977 of _0x1649d5){if(_0x4ed7c1(0x3ba)===_0x4ed7c1(0x2fc))return _0x1d9010[_0x4ed7c1(0x316)][_0x4ed7c1(0x2a8)][_0x4ed7c1(0x1c1)](this);else{const _0x27075e=DataManager['getSkillIdWithName'](_0x159977);if(!_0x27075e)continue;if(!_0x562952[_0x4ed7c1(0x31c)](_0x27075e))return!![];}}return![];}}}if(_0x339b49[_0x4ed7c1(0x2cc)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4ed7c1(0x22f)===_0x4ed7c1(0x2a1))return this[_0x4ed7c1(0x189)][_0x4ed7c1(0x1b2)]['call'](this[_0x4ed7c1(0x1f7)]);else{const _0x1d375e=JSON['parse']('['+RegExp['$1'][_0x4ed7c1(0x2cc)](/\d+/g)+']');for(const _0x3ee200 of _0x1d375e){if(_0x562952[_0x4ed7c1(0x31c)](_0x3ee200))return![];}return!![];}}else{if(_0x339b49['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x289aed=RegExp['$1'][_0x4ed7c1(0x388)](',');for(const _0x3e6bcb of _0x289aed){if(_0x4ed7c1(0x3c9)!==_0x4ed7c1(0x28f)){const _0x5dbe40=DataManager[_0x4ed7c1(0x235)](_0x3e6bcb);if(!_0x5dbe40)continue;if(_0x562952[_0x4ed7c1(0x31c)](_0x5dbe40))return![];}else for(let _0x123846=0x0;_0x123846<this[_0x4ed7c1(0x1f6)]();_0x123846++){if(this[_0x4ed7c1(0x268)](_0x123846)){const _0x5d9661=this['_buffs'][_0x123846];this[_0x4ed7c1(0x175)](_0x123846);if(_0x5d9661>0x0)this[_0x4ed7c1(0x331)](_0x123846);if(_0x5d9661<0x0)this[_0x4ed7c1(0x286)](_0x123846);}}}return!![];}}return!![];},Window_SkillList[_0x5851fa(0x2da)][_0x5851fa(0x179)]=function(_0x34619c){const _0x185868=_0x5851fa,_0xc4222d=_0x34619c['note'],_0x535524=VisuMZ[_0x185868(0x316)]['skillVisibleJS'];if(_0x535524[_0x34619c['id']])return _0x535524[_0x34619c['id']][_0x185868(0x1c1)](this,_0x34619c);else{if('OPyUV'!==_0x185868(0x294))return!![];else{const _0x34e580=this['itemLineRect'](_0x54a7d6),_0xa50ab9=this['textSizeEx'](_0x20fe7b)['width'];return _0xa50ab9<=_0x34e580[_0x185868(0x3cf)]?_0x185868(0x287):_0x185868(0x19b);}}},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x1bc)]=Window_SkillList[_0x5851fa(0x2da)][_0x5851fa(0x1d7)],Window_SkillList[_0x5851fa(0x2da)]['drawItem']=function(_0x48dd96){const _0x41e952=_0x5851fa,_0x23f8c3=this[_0x41e952(0x32b)](_0x48dd96),_0x9749cc=_0x23f8c3[_0x41e952(0x3bc)];if(_0x23f8c3)this[_0x41e952(0x366)](_0x23f8c3);VisuMZ[_0x41e952(0x316)]['Window_SkillList_drawItem'][_0x41e952(0x1c1)](this,_0x48dd96);if(_0x23f8c3)_0x23f8c3[_0x41e952(0x3bc)]=_0x9749cc;},Window_SkillList['prototype'][_0x5851fa(0x366)]=function(_0x5d23b3){const _0x1d0e0a=_0x5851fa;if(_0x5d23b3&&_0x5d23b3[_0x1d0e0a(0x433)][_0x1d0e0a(0x2cc)](/<LIST NAME:[ ](.*)>/i)){if(_0x1d0e0a(0x398)!==_0x1d0e0a(0x398)){if(!_0x13b66d[_0x1d0e0a(0x36d)](_0x581e45))return!![];}else{_0x5d23b3[_0x1d0e0a(0x3bc)]=String(RegExp['$1'])['trim']();for(;;){if(_0x5d23b3[_0x1d0e0a(0x3bc)][_0x1d0e0a(0x2cc)](/\\V\[(\d+)\]/gi))'WhJzk'!==_0x1d0e0a(0x2a0)?this[_0x1d0e0a(0x315)]=_0x51b79c:_0x5d23b3[_0x1d0e0a(0x3bc)]=_0x5d23b3[_0x1d0e0a(0x3bc)][_0x1d0e0a(0x26c)](/\\V\[(\d+)\]/gi,(_0x3b8194,_0x558eba)=>$gameVariables[_0x1d0e0a(0x22e)](parseInt(_0x558eba)));else{if(_0x1d0e0a(0x3b8)===_0x1d0e0a(0x282))return this[_0x1d0e0a(0x267)]();else break;}}}}},Window_SkillList['prototype'][_0x5851fa(0x172)]=function(_0x18616b,_0x5e63ad,_0x3688a7,_0x492fc3){const _0x5989c2=_0x5851fa;Window_Base['prototype'][_0x5989c2(0x172)]['call'](this,this[_0x5989c2(0x2cf)],_0x18616b,_0x5e63ad,_0x3688a7,_0x492fc3);},Window_SkillList[_0x5851fa(0x2da)][_0x5851fa(0x386)]=function(_0x745a4a){const _0x50683a=_0x5851fa;this['_statusWindow']=_0x745a4a,this[_0x50683a(0x1b8)]();},VisuMZ[_0x5851fa(0x316)][_0x5851fa(0x1e4)]=Window_SkillList[_0x5851fa(0x2da)][_0x5851fa(0x3e7)],Window_SkillList[_0x5851fa(0x2da)][_0x5851fa(0x3e7)]=function(){const _0x208291=_0x5851fa;VisuMZ['SkillsStatesCore']['Window_SkillList_updateHelp'][_0x208291(0x1c1)](this);if(this['_statusWindow']&&this['_statusWindow'][_0x208291(0x2f3)]===Window_ShopStatus){if(_0x208291(0x38a)!=='Qwnbc'){if(!_0xe4a45b[_0x208291(0x316)][_0x208291(0x173)](this[_0x208291(0x2cf)],_0x9e5b0b))return![];if(!_0xd3de43['SkillsStatesCore'][_0x208291(0x1fc)](this[_0x208291(0x2cf)],_0x8bfae4))return![];if(!_0x355086[_0x208291(0x316)][_0x208291(0x200)](this['_actor'],_0x489003))return![];return!![];}else this[_0x208291(0x3c7)][_0x208291(0x1e6)](this[_0x208291(0x1c9)]());}};