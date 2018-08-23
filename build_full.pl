use 5.022;
use warnings;
use JSON;
use autodie;
use Path::Tiny;

print "update database?\n[y]";
if (<STDIN> =~ /^y?\n?$/i){
	`curl -o AllSets-x.json.zip https://mtgjson.com/json/AllSets-x.json.zip`;
	`unzip AllSets-x.json.zip`
}

if(-e "format.txt"){
	print "format.txt already exist and would be overwrited, countinue?\n[y]";
	die "Stoped.\n" unless <STDIN> =~ /^y?\n?$/i;
}
open my $output, ">", "format.txt" ;
my %lang = ("English" => "e","Chinese Simplified" => "f","Chinese Traditional" => "g","French" => "h","German" => "i","Italian" => "j","Japanese" => "k","Korean" => "l","Portuguese (Brazil)" => "m","Russian" => "n","Spanish" => "o");
my %names;
my $main = decode_json(path("AllSets-x.json")->slurp);
for(keys %$main){
	for (@{${$$main{$_}}{cards}}){
		my $name_e = $$_{name};
		next if $name_e =~ /token card$/;
		$names{$name_e} = {"e"=> $name_e} unless exists $names{$name_e};
		${$names{$name_e}}{$lang{$$_{language}}}=$$_{name} for @{$$_{foreignNames}};
	}
}
print $output "data = ", encode_json [map $names{$_},sort keys %names];