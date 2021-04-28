select STATE, count(STATE) as 'Fires per State'
from Fires
group by STATE
order by COUNT(STATE) desc;

select SOURCE_REPORTING_UNIT_NAME, COUNT(SOURCE_REPORTING_UNIT_NAME) as 'count', STATE
from Fires
group by SOURCE_REPORTING_UNIT_NAME
order by COUNT(SOURCE_REPORTING_UNIT_NAME) desc;

select STAT_CAUSE_DESCR, COUNT(STAT_CAUSE_DESCR) as 'count'
from Fires
group by STAT_CAUSE_DESCR;

select FIPS_NAME, ROUND(AVG(FIRE_SIZE),2), STATE
from Fires
group by FIPS_NAME
ORDER BY round(AVG(FIRE_SIZE),2) DESC;


