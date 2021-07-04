function validate(type){
   msg="";
	m="- ";
	fe=0;
	if(typeof(form_errors)!='undefined')
		fe=1;

	if(typeof(document.F)!='undefined') f=document.F;
	else if(typeof(document.F1)!='undefined') f=document.F1;
	else return true;
	if(!type) type='j1';
	if(type.indexOf('j1')>=0)
	{
		if(typeof(f.ci_email_login)!='undefined' && typeof(f.user)!='undefined')
		{
			if (f.user.value.length<8 || f.user.value.indexOf("@")<2)
			{
				msg+=m+"Please enter your email address\n";
				if(fe) form_errors['user']='y';
			}
		}
		else if(typeof(f.skip_user)=='undefined' && typeof(f.user)!='undefined')
		{
		   if (f.user.value.length<4 || f.user.value.length>12)
			{
				msg=m+"Please select 4-12 letters for your username\n";
				if(fe) form_errors['user']='y';
			}
			else if (f.user.value.indexOf(' ')>-1)
			{
				msg+=m+"Don't enter spaces in the Username field\n";
				if(fe) form_errors['user']='y';
			}
		}
		if(typeof(f.skip_pass)=='undefined' && typeof(f.pass)!='undefined')
		{
		   if (f.pass.value.length<6 || f.pass.value.length>16)
			{
				msg+=m+"Please select 6-16 letters for your Password\n";
				if(fe) form_errors['pass']='y';
			}
			else if (f.pass.value.indexOf(' ')>-1)
			{
				msg+=m+"Don't enter spaces in the Password field\n";
				if(fe) form_errors['pass']='y';
			}
		}
		if(typeof(f.skip_fname)=='undefined' && typeof(f.fname)!='undefined')
		{
		   if (f.fname.value.length<2)
			{
				msg+=m+"You forgot to enter your first name\n";
				if(fe) form_errors['fname']='y';
			}
		}
		if(typeof(f.skip_lname)=='undefined' && typeof(f.lname)!='undefined')
		{
		   if (f.lname.value.length<2) 
			{ 
				msg+=m+"You forgot to enter your last name\n";
				if(fe) form_errors['lname']='y';
			}
		}
		if(typeof(f.skip_zip)=='undefined' && typeof(f.zip)!='undefined')
		{
			if (f.zip.value.length<3)
			{
				msg+=m+"Please enter your zip code\n";
				if(fe) form_errors['zip']='y';
			}				
		}
		if(typeof(f.skip_email)=='undefined' && typeof(f.email)!='undefined')
		{
		   if (f.email.value.length<8)
			{
				msg+=m+"Please enter your email address\n";
				if(fe) form_errors['email']='y';
			}
		}
		if(typeof(f.ptype)!='undefined' && typeof(f.skip_country)=='undefined' && typeof(f.country)!='undefined')
		{
			ptype=get_ptype_value(f);
			if(typeof(f.country.selectedIndex)!='undefined')
				country=f.country[f.country.selectedIndex].value;
			else
				country=f.country.value;
			if(ptype=='k' && country!='US:840')
				msg+=m+"Online Checks is only available for US residents";
		}
		if(typeof(f.skip_echeck_bdate)=='undefined' && typeof(f.birthdateMonth)!='undefined' && typeof(f.birthdateDay)!='undefined' && typeof(f.birthdateYear)!='undefined')
		{
			mm=parseInt(f.birthdateMonth[f.birthdateMonth.selectedIndex].value);
			dd=parseInt(f.birthdateDay[f.birthdateDay.selectedIndex].value);
			yy=parseInt(f.birthdateYear[f.birthdateYear.selectedIndex].value);
			if(isNaN(mm) || isNaN(dd) || isNaN(yy))
			{
				msg+=m+"Please enter your Date Of Birth\n";
				if(fe)
				{
					if(isNaN(mm)) form_errors['birthdateMonth']='y';
					if(isNaN(dd)) form_errors['birthdateDay']='y';
					if(isNaN(yy)) form_errors['birthdateYear']='y';
				}
			}
			else
			{
				today=new Date();
				tm=today.getMonth();
				td=today.getDate();
				ty=today.getFullYear()-18;
				mm--;
				if(yy>ty || (yy==ty && mm>tm) || (yy==ty && mm==tm && dd>td))
				{
					msg+=m+"You must be 18 years of age or older to join";
					if(fe) form_errors['dob']='y';
				}
			}
		}
		if(typeof(f.agree)!='undefined')
		{
			if(!f.agree.checked)
			{	
				msg+=m+"You must agree to the Terms & Conditions\n";
				if(fe) form_errors['agree']='y';
			}
		}
	}
	if(type.indexOf('j2')>=0)
	{
		if(typeof(f.ccn)!='undefined')
		{
		   if (f.ccn.value.length!=16)
			{
				msg+=m+"Invalid credit card\n";
				if(fe) form_errors['ccn']='y';
			}
		}
		if(typeof(f.ccn)!='undefined')
		{
		   if (f.cvv.value.length<2)
			{
				msg+=m+"Invalid cvv\n";
				if(fe) form_errors['cvv']='y';
			}
		}
		if(typeof(f.expM)!='undefined')
		{
			if(typeof(f.expM=='HTMLSelectElement'))
				expm=parseInt(f.expM[f.expM.selectedIndex].value);
			else
				expm=parseInt(f.expM.value);
			if(expm<1 || expm>12)
			{
				msg+=m+"Invalid expiration month\n";
				if(fe) form_errors['expM']='y';
			}
		}
		if(typeof(f.expY)!='undefined')
		{
			if(typeof(f.expY=='HTMLSelectElement'))
				expy=parseInt(f.expY[f.expY.selectedIndex].value);
			else
				expy=parseInt(f.expY.value);
			if(expy<1)
			{
				msg+=m+"Invalid expiration year\n";
				if(fe) form_errors['expY']='y';
			}
		}
	}
   if (msg!=""){
		if(type.indexOf('silent')<0)
	      alert("Please fix the following problems:\n"+msg);
      return false;
   }
   return true;
}

function get_ptype_value(f)
{
	for (var i=0; i<f.ptype.length; i++)
	{
		if(f.ptype[i].checked)
			return (f.ptype[i].value);
	}
	return;
}
