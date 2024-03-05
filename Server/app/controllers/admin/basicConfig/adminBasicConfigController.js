const Admin = require("../../../models/Admin");
const { makeJsonResponse } = require('../../../../utils/response')
const { hashPassword } = require('../.././../../utils/auth');
const faker = require('faker');
const mongoose = require('mongoose');
const Africa = require("../../../models/continents/Africa");
const Asia = require("../../../models/continents/Asia");
const Europe = require("../../../models/continents/Europe");
const NorthAmerica = require("../../../models/continents/NorthAmerica");
const SouthAmerica = require("../../../models/continents/SouthAmerica");
const Australia = require("../../../models/continents/Australia");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {

    createAdmin: async (req, res, next) => {
        let httpStatusCode = 500;
        let responseData = {};
        try {
            const newAdmin = await new Admin({
                name: 'Super Admin',
                email: 'admin@system.com',
                roles: ['super-admin']
            });
            let hashedPassword = await hashPassword('admin@123')

            if (hashedPassword.success) {
                newAdmin.password = hashedPassword.data.hashedValue;
                console.log(newAdmin)

                let admin = await newAdmin
                    .save()
                    .then(user => {
                        console.log(user)

                        let response = makeJsonResponse(hashedPassword);
                        return res.status(200).json(response);

                    })
                    .catch(err => {
                        console.log(err)
                        return makeJsonResponse(err);
                        let response = makeJsonResponse(err);
                        return res.status(200).json(response);
                    });


            } else {
                return makeJsonResponse(hashedPassword);
            }

        } catch (error) {
            return makeJsonResponse(error);

        }
    },
    createCountryEntry: async (req,res,next) => {
        console.log('countries-insertcountries-insert')
        let httpStatusCode = 500;
        let responseData = {};
        try {
            const africa = await Africa.insertMany([
                {name:'Algeria', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Algeria.svg.png'},
                {name:'Angola', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Angola.svg.png'},
                {name:'Benin', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Benin.svg.png'},
                {name:'Botswana', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Botswana.svg.png'},
                {name:'Burkina Faso', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Burkina_Faso.svg.png'},
                {name:'Burundi', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Burundi.svg.png'},
                {name:'Cameroon', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Cameroon.svg.png'},
                {name:'Cape Verde', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Cape_Verde.svg.png'},
                {name:'Central African Republic', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_the_Central_African_Republic.svg.png'},
                {name:'Chad', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Chad.svg.png'},
                {name:'Comoros', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_the_Comoros.svg.png'},
                {name:'Democratic Congo', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_the_Democratic_Republic_of_the_Congo.svg.png'},
                {name:'Congo', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_the_Republic_of_the_Congo.svg.png'},
                {name:'Djibouti', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Djibouti.svg.png'},
                {name:'Egypt', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Egypt.svg.png'},
                {name:'Equatorial Guinea', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Equatorial_Guinea.svg.png'},
                {name:'Eritrea', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Eritrea.svg.png'},
                {name:'Eswatini', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Eswatini.svg.png'},
                {name:'Ethiopia', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Ethiopia.svg.png'},
                {name:'Gabon', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Gabon.svg.png'},
                {name:'Gambia', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_The_Gambia.svg.png'},
                {name:'Ghana', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Ghana.svg.png'},
                {name:'Guinea', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Guinea.svg.png'},
                {name:'Guinea-Bissau', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Guinea-Bissau.svg.png'},
                {name:'Côte De Ivor', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Cote_dIvoire.svg.png'},
                {name:'Kenya', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Kenya.svg.png'},
                {name:'Lesotho', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Lesotho.svg.png'},
                {name:'Liberia', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Liberia.svg.png'},
                {name:'Libya', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Libya.svg.png'},
                {name:'Madagascar', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Madagascar.svg.png'},
                {name:'Malawi', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Malawi.svg.png'},
                {name:'Mali', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Mali.svg.png'},
                {name:'Mauritania', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Mauritania.svg.png'},
                {name:'Mauritius', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Mauritius.svg.png'},
                {name:'Morocco', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Morocco.svg.png'},
                {name:'Mozambique', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Mozambique.svg.png'},
                {name:'Namibia', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Namibia.svg.png'},
                {name:'Niger', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Niger.svg.png'},
                {name:'Nigeria', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Nigeria.svg.png'},
                {name:'Rwanda', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Rwanda.svg.png'},
                {name:'São Tomé and Príncipe', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_São_Tomé_and_Príncipe.svg.png'},
                {name:'Senegal', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Senegal.svg.png'},
                {name:'Seychelles', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Seychelles.svg.png'},
                {name:'Sierra Leone', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Sierra_Leone.svg.png'},
                {name:'Somalia', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Somalia.svg.png'},
                {name:'South Africa', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_South_Africa.svg.png'},
                {name:'South Sudan', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_South_Sudan.svg.png'},
                {name:'Sudan', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Sudan.svg.png'},
                {name:'Tanzania', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Tanzania.svg.png'},
                {name:'Togo', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Togo.svg.png'},
                {name:'Tunisia', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Tunisia.svg.png'},
                {name:'Uganda', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Uganda.svg.png'},
                {name:'Zambia', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Zambia.svg.png'},
                {name:'Zimbabwe', imagePath: process.env.BASE_URL+'/country_flags/Africa/Flag_of_Zimbabwe.svg.png'},
            ])
            console.log(africa,'<==africa')
            const asia = await Asia.insertMany([
                {name:'Afghanistan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_the_Taliban.svg.png'},
                {name:'Armenia', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Armenia.svg.png'},
                {name:'Azerbaijan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Azerbaijan.svg.png'},
                {name:'Bahrain', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Bahrain.svg.png'},
                {name:'Bangladesh', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Bangladesh.svg.png'},
                {name:'Bhutan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Bhutan.svg.png'},
                {name:'Brunei', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Brunei.svg.png'},
                {name:'Cambodia', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Cambodia.svg.png'},
                {name:'China', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_China.svg.webp'},
                {name:'Cyprus', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Cyprus.svg.png'},
                {name:'East Timor', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_East_Timor.svg.png'},
                {name:'Georgia', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Georgia.svg.png'},
                {name:'India', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_India.svg.webp'},
                {name:'Indonesia', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Indonesia.svg.png'},
                {name:'Iran', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Iran.svg.png'},
                {name:'Iraq', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Iraq.svg.png'},
                {name:'Israel', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Israel.svg.png'},
                {name:'Japan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Japan.svg.png'},
                {name:'Jordan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Jordan.svg.png'},
                {name:'Kazakhstan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Kazakhstan.svg.png'},
                {name:'North Korea', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_North_Korea.svg.png'},
                {name:'South Korea', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_South_Korea.svg.webp'},
                {name:'Kuwait', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Kuwait.svg.png'},
                {name:'Kyrgyzstan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Kyrgyzstan.svg.png'},
                {name:'Laos', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Laos.svg.png'},
                {name:'Lebanon', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Lebanon.svg.png'},
                {name:'Malaysia', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Malaysia.svg.png'},
                {name:'Maldives', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Maldives.svg.png'},
                {name:'Mongolia', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Mongolia.svg.png'},
                {name:'Myanmar', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Myanmar.svg.png'},
                {name:'Nepal', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Nepal.svg.png'},
                {name:'Oman', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Oman.svg.png'},
                {name:'Pakistan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Pakistan.svg.webp'},
                {name:'Palestine', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Palestine.svg.png'},
                {name:'Philippines', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_the_Philippines.svg.png'},
                {name:'Qatar', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Qatar.svg.png'},
                {name:'Saudi Arabia', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Saudi_Arabia.svg.webp'},
                {name:'Singapore', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Singapore.svg.png'},
                {name:'Sri Lanka', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Sri_Lanka.svg.png'},
                {name:'Syria', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Syria.svg.png'},
                {name:'Tajikistan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Tajikistan.svg.png'},
                {name:'Taiwan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_the_Republic_of_China.svg.webp'},
                {name:'Thailand', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Thailand.svg.png'},
                {name:'Turkey', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Turkey.svg.png'},
                {name:'Turkmenistan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Turkmenistan.svg.png'},
                {name:'United Arab Emirates', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_the_United_Arab_Emirates.svg.png'},
                {name:'Uzbekistan', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Uzbekistan.svg.png'},
                {name:'Vietnam', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Vietnam.svg.webp'},
                {name:'Yemen', imagePath: process.env.BASE_URL+'/country_flags/Asia/Flag_of_Yemen.svg.png'},
            ])

            console.log('asia=>',asia);

            const europe = await Europe.insertMany([
                {name:'Albania', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Albania.svg.png'},
                {name:'Andorra', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Andorra.svg.png'},
                {name:'Austria', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Austria.svg.png'},
                {name:'Belarus', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Belarus.svg.png'},
                {name:'Belgium', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Belgium.svg.png'},
                {name:'Bosnia and Herzegovina', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Bosnia_and_Herzegovina.svg.png'},
                {name:'Bulgaria', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Bulgaria.svg.png'},
                {name:'Croatia', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Croatia.svg.png'},
                {name:'Czechia', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_the_Czech_Republic.svg.png'},
                {name:'Denmark', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Denmark.svg.png'},
                {name:'Estonia', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Estonia.svg.png'},
                {name:'Finland', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Finland.svg.png'},
                {name:'France', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_France.svg.png'},
                {name:'Germany', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Germany.svg.png'},
                {name:'Greece', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Greece.svg.png'},
                {name:'Hungary', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Hungary.svg.png'},
                {name:'Iceland', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Iceland.svg.png'},
                {name:'Ireland', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Ireland.svg.png'},
                {name:'Italy', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Italy.svg.png'},
                {name:'Kosovo', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Kosovo.svg.png'},
                {name:'Latvia', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Latvia.svg.png'},
                {name:'Liechtenstein', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Liechtenstein.svg.png'},
                {name:'Lithuania', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Lithuania.svg.png'},
                {name:'Luxembourg', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Luxembourg.svg.png'},
                {name:'Malta', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Malta.svg.png'},
                {name:'Moldova', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Moldova.svg.png'},
                {name:'Monaco', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Monaco.svg.png'},
                {name:'Montenegro', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Montenegro.svg.png'},
                {name:'Netherlands', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_the_Netherlands.svg.png'},
                {name:'North Macedonia', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_North_Macedonia.svg.png'},
                {name:'Norway', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Norway.svg.png'},
                {name:'Poland', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Poland.svg.png'},
                {name:'Portugal', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Portugal.svg.png'},
                {name:'Romania', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Romania.svg.png'},
                {name:'Russia', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Russia.svg.png'},
                {name:'San Marino', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_San_Marino.svg.png'},
                {name:'Serbia', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Serbia.svg.png'},
                {name:'Slovakia', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Slovakia.svg.png'},
                {name:'Slovenia', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Slovenia.svg.png'},
                {name:'Spain', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Spain.svg.png'},
                {name:'Sweden', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Sweden.svg.png'},
                {name:'Switzerland', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Switzerland.svg.png'},
                {name:'Ukraine', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_Ukraine.svg.png'},
                {name:'United Kingdom', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_the_United_Kingdom.svg'},
                {name:'Vatican City', imagePath: process.env.BASE_URL+'/country_flags/Europe/Flag_of_the_Vatican_City.svg'},
            ])
            console.log('europe=>',europe);
            const northAmerica = await NorthAmerica.insertMany([
                {name:'Antigua and Barbuda', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Antigua_and_Barbuda.svg.png'},
                {name:'The Bahamas', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_the_Bahamas.svg.png'},
                {name:'Barbados', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Barbados.svg.png'},
                {name:'Belize', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Belize.svg.png'},
                {name:'Canada', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Canada.svg.png'},
                {name:'Costa Rica', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Costa_Rica_(state).svg.png'},
                {name:'Cuba', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Cuba.svg.png'},
                {name:'Dominica', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Dominica.svg.png'},
                {name:'Dominican Republic', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_the_Dominican_Republic.svg.png'},
                {name:'El Salvador', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_El_Salvador.svg.png'},
                {name:'Grenada', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Grenada.svg.png'},
                {name:'Guatemala', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Guatemala.svg.png'},
                {name:'Haiti', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Haiti.svg.png'},
                {name:'Honduras', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Honduras.svg.png'},
                {name:'Jamaica', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Jamaica.svg.png'},
                {name:'Mexico', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Mexico.svg.png'},
                {name:'Nicaragua', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Nicaragua.svg.png'},
                {name:'Panama', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Panama.svg.png'},
                {name:'Saint Kitts and Nevis', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Saint_Kitts_and_Nevis.svg.png'},
                {name:'Saint Lucia', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Saint_Lucia.svg.png'},
                {name:'Saint Vincent and the Grenadines', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_Saint_Vincent_and_the_Grenadines.svg.png'},
                {name:'United States', imagePath: process.env.BASE_URL+'/country_flags/NorthAmerica/Flag_of_the_United_States.svg.webp'},
            ])
            console.log('northAmerica=>',northAmerica);
            const southAmerica = await SouthAmerica.insertMany([
                {name:'Argentina', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Argentina.svg.png'},
                {name:'Bolivia', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Bolivia.svg.png'},
                {name:'Brazil', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Brazil.svg.png'},
                {name:'Chile', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Chile.svg.png'},
                {name:'Colombia', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Colombia.svg.png'},
                {name:'Ecuador', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Ecuador.svg.png'},
                {name:'Guyana', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Guyana.svg.png'},
                {name:'Paraguay', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Paraguay.svg.png'},
                {name:'Peru', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Peru.svg.png'},
                {name:'Suriname', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Suriname.svg.png'},
                {name:'Trinidad and Tobago', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Trinidad_and_Tobago.svg.png'},
                {name:'Uruguay', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Uruguay.svg.png'},
                {name:'Venezuela', imagePath: process.env.BASE_URL+'/country_flags/SouthAmerica/Flag_of_Venezuela.svg.png'},
            ])

            console.log('southAmerica=>',southAmerica);
            const australia = await Australia.insertMany([
                {name:'Australia', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_Australia.svg.png'},
                {name:'Cook Islands', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_the_Cook_Islands.svg.png'},
                {name:'Federated States of Micronesia', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_the_Federated_States_of_Micronesia.svg.png'},
                {name:'Fiji', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_Fiji.svg.png'},
                {name:'Kiribati', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_Kiribati.svg.png'}, 
                {name:'Marshall Islands', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_the_Marshall_Islands.svg.png'},
                {name:'Nauru', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_Nauru.svg.png'},
                {name:'New Zealand', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_New_Zealand.svg.png'},
                {name:'Niue', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_Niue.svg.png'},
                {name:'Palau', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_Palau.svg.png'},
                {name:'Papua New Guinea', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_Papua_New_Guinea.svg.png'},
                {name:'Samoa', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_Samoa.svg.png'},
                {name:'Solomon Islands', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_the_Solomon_Islands.svg.png'},
                {name:'Tonga', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_Tonga.svg.png'},
                {name:'Tuvalu', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_Tuvalu.svg.png'},
                {name:'Vanuatu', imagePath: process.env.BASE_URL+'/country_flags/Australia/Flag_of_Vanuatu.svg.png'},

            ])
            console.log('australia=>',australia);
            responseData.success = true
            return res.status(200).json(responseData);


        } catch (error) {
            console.log(error,'<[[[[==error');
            return makeJsonResponse(error);

        }
    },

};
