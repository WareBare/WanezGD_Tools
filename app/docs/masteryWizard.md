# Mastery Wizard #
## Introduction ##
Create a new Mastery with the Program, all required files will be created by using parsed Templates. Created files follow Crate's Naming Conventions (_classtraining_classX.dbr, _classtree_classX.dbr, etc)
You can find the "New Mastery" Button to open the Mastery Wizard Window at "Mastery/Selection".

## How To ##
### Step 1 ###
* `Mastery Directory:` the directory name (not Mastery Tag), Crate is using "PlayerclassXX". You could use your Mod name as a prefix and the mastery name (coolmodNecromancer).
* `Enumeration:` Mastery Enumeration, only free mastery slots are possible to select, you don't have to worry about overriding another Mastery.
  * Enumeration will also be used to determine the Tag for Mastery and Dual Masteries
  * as well as for most file names
  * and the spot inside femalepc01.dbr/malepc01.dbr and skills_mastertable.dbr
  * Mastery Buttons are created, too.
  * You don't have to worry about any of it
* `Skill Bitmap:` path to .tex for the Mastery Leveling Button (the +)
  * `optional` {ENUM}: can be used to insert Mastery Enumeration with leading zero.
  * `required` {TYPE}: will insert "up" and "down" (depending on the field it is used on
* Class Training - Bar
  * `optional` {ENUM}: can be used to insert Mastery Enumeration with leading zero.
* Class Selection - Button (DBR)
  * `required:` {ENUM} where Mastery Enumeration with leading zero is inserted.
* Class Selection - Button {Image}
  * `required` {TYPE}: where up/down/over/disabled is inserted.

### Step 2 ###
* Mastery Stats per level.
* Empty fields are ignored.
* The number in the field determines the increment per level (3 will result in +300 at Mastery Level 100, +150 at Mastery Level 50 and +3 at Mastery Level 1).
  * you may use decimals.
* values are inserted into the correct fields in the new _classtraining_classX.dbr

### Step 3 ###
* Click "Create".
* Congratulations to your new Mastery, you can use the Mastery Selection UI to move the button to the right location.
* and the Skill UI to create new Skills and put them in the right spot.