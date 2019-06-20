*Change colors for Affixes, Item Names and MI to quickly see a difference. Rare Affixes will be colored as such, without changing the color of the Item's name itself and MI will appear different from their Rarity's default color. You may also see Properties such as Damage Types with different colors, this allows you to decide at a glance if an item is good for your build.*

---
# Table of Contents
1. [Introduction](#section-intro)
1. [Installation](#section-setup)
1. [Current Features](#section-features)
1. [Pictures](#section-img)
1. [Tool to Set Your Own Colors](#section-tool)
1. [Color Presets](#section-presets)

---
<a name="section-intro"></a>
# <font color="#40E0D0">Introduction</font>

This is not an actual mod neither is it going to change the game in any way, the files can be deleted at any time and nothing else is going to change when that happens. Which makes this a non-destructive way of changing the way items are shown in the game (playing with a mod or without).

*If you are using a different language (using files from translators) you may have to get them from your Community Translation Topic or use the tool mentioned below.*

---
<a name="section-setup"></a>
# <font color="#55AF55">Installation</font>

You may download [Full Rainbow v1.1.2.5](https://mega.nz/#!zpkgBIDJ!JPF_bLNBfCmNz5h1Yp--AclZd9dwLVhiIU3eDsBQN-M "MEGA Download link") by `Matougi` directly or go to the [post](https://forums.crateentertainment.com/t/wip-item-filter-via-colorcoding/42765/222), you may also use the tool myself and others are using [from the section below](#section-tool) to make your own colors.

Extract the contents into you Grim Dawn Directory, if done right, you will end up with a settings Folder in your Grim Dawn Directory. Inside that settings Folder is a text_en Folder and inside that are three *.txt files, responsible for changing the color of tags for the Main Game as well as for Mods.

The files + path you should now have:
`Grim Dawn/settings/text_en/tags_items.txt`
`Grim Dawn/settings/text_en/tags_ui.txt`
`Grim Dawn/settings/text_en/tagsgdx1_items.txt`

---
<a name="section-features"></a>
# <font color="#55AF55">Current Features</font>

* Prefix and Suffix have the color of their rarity, no matter the item they are on.
* The Item's Name
  * is in the color of the base item's rarity
  * MI are in different color than an item of the same rarity (rares are green, rare MI are olive)
* Item Style/Quality are a different color (this includes Empowered and Mythical)
* Damage Types in tooltips
  * In a color for their Damage Type
  * If you do not want this one, you can just delete `Grim Dawn/settings/text_en/tags_ui.txt`

---
<a name="section-img"></a>
# <font color="#55AF55">Pictures</font>

[details="1"]
![001|195x499](upload://WkCpn2KvDZUyM5KuGW8DTndbAQ.jpeg)
[/details]
[details="2"]
![002|471x373](upload://rofqaVADbnm2RPQIbaeFZxi4yp6.jpeg)
[/details]
[details="3"]
![003|405x432](upload://3fLLRra2K5hiiskNbTa5pHhvJHa.jpeg)
[/details]

---
<a name="section-tool"></a>
# <font color="#55AF55">Tool to Set Your Own Colors</font>

You may create your own color settings with the help of the tool I use myself and many others (also works for different languages):

* General Information (ReadMe.md): https://github.com/WareBare/WanezGD_Tools
* Downloads: https://github.com/WareBare/WanezGD_Tools/releases

---
<a name="section-presets"></a>
# <font color="#55AF55">Color Presets</font>

*Different color presets are available to choose from, some may be available as download others will only be possible with the help of the tool.*

<details><summary><kbd>Full Rainbow</kbd></summary>
    <ul>
        <li>Item Names<ul>
            <li>MI have a different color than items of the same rarity.</li>
        </ul></li>
        <li>Tooltip<ul>
            <li>Each Damage Type has its own color.</li>
            <li>Attributes and other Special stats have their own separate color.</li>
        </ul></li>
    </ul>
</details>

<details><summary><kbd>Basic Highlighting</kbd></summary>
    <details><summary><kbd>Example Picture</kbd></summary>
        ![BasicHighlighting_Example|376x464](upload://zpQ7KVlAEr6Qhc5PS0Jv3OZbXt5.jpeg)
    </details>
    <ul>
        <li>Item Names<ul>
            <li>MI have the same color as items of the same rarity.</li>
            <li>Style Tags for Common, Magical and Rare items have a different color (Empowered and Mythical is the vanilla color).</li>
            <li>Epics and Legendaries are not using a specified color (therefore the (S) won't be there for Set items).</li>
        </ul></li>
        <li>Tooltip<ul>
            <li>Damage Type Colors are in three groups (Elemental, Physical/Pierce, Other).</li>
            <li>Damage over Time has a different color than the Direct Damage Types (but using the same grouping, with bleeding into the Physical/Pierce group).</li>
        </ul></li>
    </ul>
</details>
