# Skill Edit #
This is accessible by either double-clicking a skill Icon on the Allocation Screen or selecting a Skill Icon and using the "Edit Skill" Button.

### Properties ###
* You can use the following values to have the tool calculate Properties for their respective Levels up to the skillUltimateLevel + 10. This way you can change the skillUltimateLevel without refreshing the values every time you do.
* Individual values are saved to have them available for later (if you intend to balance a skill and just want to increase the damage by 10% for example).
#### Values ####
* You can experiment by changing the values, nothing is saved until you use the Button. The fields are organized in groups (the ones next to each other).
* `Starting Value` - the first value to be used.
* `Maximum Value` - the highest value possible.
* `Increment` - Increment the Starting Value and everything after that by this number.
* `Inc. once every` - Increment once every x Levels, often used for increased number of Projectiles or number of Pets spawned, both of which may also make use of "Maximum Value" to set a cap [default: 1, which means it will Increment the value for every Level, 2 is every second Level...]
* `Multiplier` - Percentage Increase per Level, this does not apply one, it applies to each Level (to create a non linear scaling). Percentages are written in decimals -> 1.5 = 50%; 1.025 = 2.5%
* `Inc. Inc.` - An Increment for the previous "Increment", applies on every Level unless "Inc. every" says otherwise.
* `Inc. every` - It simply determines when "Inc. Inc." applies (a value of 5 will add the number from "Inc. Inc." every 5 Levels to the value set in "Increment").
*  ![Skill - Edit Properties](http://wanez.de/misc/WanezToolsGD-v0.1.2_SkillEdit_properties.gif "Skill - Edit Properties")