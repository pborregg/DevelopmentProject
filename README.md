# TRPG Project
## Overview
The purpose of this project is to show how you develop. Do not focus on being feature complete, but on well structured and robust code execution and data manipulation.

Acceptible frameworks that can be used for this project
- Pure HTML/CSS/JS (No framework)
- Angular
- Mithril

### Setting
A client has come to you requesting a webpage where they and their players can manage their character sheets for the obscure Tabletop RPG 'Blood and Bone'.

You are to develop a Single Page Application, according to the specifications listed below. You can take up to 4 hours to work on this project. Please email your what you have to sbarney@xcite-interactive.com, along with the time you took to develop and instructions on how to run it.

## Specifications

 - Minimum viable product
	 - Players must be able to change their character's name
	 - Players must be able to alter their character's Base Attributes
		 - The main attributes that can be directly adjusted are Strength, Dexterity, Mind, and Presence
		 - The default value for any attribute is 0
	 - Characters have a set of computed attributes known as Combat Attributes
		 - Vitality
			 - Calculated as 3 + Strength
			 - When characters take damage, they lose 1 vitality. Allow players to mark how many times they have taken damage and have this stat update accordingly
			 - Damage is persistant
		 - Evasion: Calculated at 10 + Dexterity
		 - Armor: Calculated as Evasion
		 - Alacrity: Calcuated as Dexterity + Mind
		 - Tenacity
			 - Calculated as 1 + Presence
			 - Characters can use Tenacity and recieve Tenacity, so allow players to increment this value
		 - Power: Always 0
			 - Currently Unused
	 - Characters have a set of skills that they can train
		 - Skills have Ranks
			 - Rank 0: Untrained
			 - Rank 1: Novice
			 - Rank 2: Apprentice
			 - Rank 3: Adept
			 - Rank 4: Expert
			 - Rank 5: Master
		 - Skill ranks can only go as high as the associated Base Attribute. For example, if you have 0 Dexterity, you can only have Thievery at Rank 0
		 - Skills are associated with a Base Attribute. Below is a list of Base Attributes with their associated skills listed beneath them
			 - Strength
				 - Fighting
			 - Dexterity
				 - Fighting
				 - Thievery
				 - Stealth
				 - Archery
			 - Mind
				 - Learned
				 - Survival
				 - Perception
				 - Apothecary
			 - Presence
				 - Intimidation
				 - Performance
				 - Manipulation
				 - Insight
				 - Power
			 - Mind
				 - Power
	 - Players can export their character
	 - Players can import their character
	 - The UI should be decent and useable
 - Stretch Goals
	 - Characters can equip armor and weapons
		 - Armor
			 - Provides a bonus to the Armor stat depending on the armor equipped
			 - Limits how much of a bonus Dexterity provides to Evasion depending on the armor equipped
			 - Only 1 armor slot is available: chest armor
		 - Weapon: Determines whether Strength or Dexterity is rolled for the Attack Skill
	 - Skills
		 - Each skill has a button next to it to generate a value based on the skill level and displays it
			 - If the skill is untrained, it generates 2 numbers between 1 and 20, and returns the lower of the two
			 - If the skill is between ranks 1 and 5, it generates a number between 1 and 20, then adds a random number from 1 to (4 plus (rank - 1) times 2).
	 - Traits
		 - Characters can have n number of traits
		 - Traits can have requirements
			 - Requirements can be minimum requirements of base stats or other traits
		 - These alter the Combat Attributes
			 - Example: If the character is holding a bow, +2 to Evasion after Armor is calculated
			 - Example: +1 rank in Fighting
