function gen(){
	if (document.getElementById('button').classList.contains('button_o')){
		return 
	}
	document.getElementById('button').classList.add('button_o') //lock button during translation

	lan_from = document.getElementById('langf').value
	lan_to = document.getElementById('langt').value
	set = {}
	for (card of data.filter(function(x){return x.hasOwnProperty(lan_from) && x.hasOwnProperty(lan_to)})){
		set[card[lan_from]] = card[lan_to]
	}
	out = ''
	for (card of document.getElementById('input1').value.split('\n')){
		if(card.length > 1){ //text is non-empty
			card = card.replace(/^\s+/,'') //remove trailing spaces
			card = card.replace(/[’‘`ˊᐟ‵‵′]/,"'") //repace non-standard quotation marks
			card = card.replace(/\[[A-Za-z0-9]*\]/,'').replace(/^SB:\s*/,'') // remove set code(mtgtop8)
			card = card.replace(/\([A-Za-z0-9]{3}\) \d+ ?$/,'')// remove set code(Arena)
			if (copy = card.match(/^(\d+\s*x)\s+(.+)/)){
				card_copies = copy[1].replace(/\s*$/,' ')
				card_name = copy[2].replace(/\s+$/,'')
			}else if(copy = card.match(/^(\d+)\s*(.+)/)){
				card_copies = copy[1].replace(/\s*$/,' ')
				card_name = copy[2].replace(/\s+$/,'')
			}else{
				card_copies = ''
				card_name = card.replace(/\s+$/,'')
			}
			if (split = card.match(/([^\s]+)\s*\/+\s*([^\s]+)/)){
				out = out+card_copies+get_name(split[1])+" // " + get_name(split[2]) + "\n" //split card
			}else{
				out = out+card_copies+get_name(card_name)+"\n"
			}	
			
		}else{
			out += "\n"
		}
	}
  	document.getElementById('input1').value = out.replace(/\n+$/,'')//remove trailing empty line
  	document.getElementById('button').classList.remove('button_o')
	

}
function get_name(card){
	if (set.hasOwnProperty(card)){
		return set[card]
	}else{
		console.log("'"+card+"' not found")
		return card
	}
}
function swith(){
	var a = document.getElementById('langf').value
	var b = document.getElementById('langt').value
	document.getElementById('langf').value = b
	document.getElementById('langt').value = a
}






