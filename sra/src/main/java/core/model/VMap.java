package core.model;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import core.support.JsonObjectMapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

public class VMap extends EgovMap {
    private static final long serialVersionUID = 6577279269960628222L;

    private static final JsonObjectMapper jsonMapper = new JsonObjectMapper();

    public String getString ( String key ) {
        Object value = get( key );
        return value != null ? value.toString() : null;
    }

    public int getInt ( String key ) {
        String value = getString( key );
        return value != null ? Integer.parseInt( value ) : 0;
    }

    public long getLong ( String key ) {
        String value = getString( key );
        return value != null ? Long.parseLong( value ) : 0;
    }

    public float getFloat ( String key ) {
        String value = getString( key );
        return value != null ? Float.parseFloat( value ) : 0;
    }

    public double getDouble ( String key ) {
        String value = getString( key );
        return value != null ? Double.parseDouble( value ) : 0;
    }

    public double getDoubleRound ( String key, int pow ) {
        double d     = getDouble( key );
        double round = Math.pow( 10, pow );
        return Math.round( d * round ) / round;
    }

    public Timestamp getTimestamp ( String key ) {
        Object value = get( key );
        if ( value instanceof Timestamp ) {
            return ( Timestamp ) value;
        }
        return null;
    }

    public String getTimestampString ( String key ) {
        return "" + getTimestamp( key ).getTime();
    }

    public LocalDateTime getLocalDateTime ( String key ) {
        return ( LocalDateTime ) get( key );
    }

    public ZonedDateTime getZonedDateTimeUTC ( String key ) {
        return getTimestamp( key ).toLocalDateTime().atZone( ZoneId.of( "UTC" ) );
    }

    public ZonedDateTime getZonedDateTimeUTCtoZoneId ( String key, ZoneId zoneId ) {
        return getZonedDateTimeUTC( key ).withZoneSameInstant( zoneId );
    }

    public VMap getVMap ( String key ) {
        Object value = get( key );
        return value != null ? jsonMapper.convertValue( value, VMap.class ) : new VMap();
    }

    @SuppressWarnings("unchecked")
    public List<VMap> getList ( String key ) {
        Object value = get( key );
        return value != null ? (List<VMap>) value : new ArrayList<VMap>();
    }

    public static VMap of ( Map<String, ?> map ) {
        VMap copy = new VMap();
        copy.putAll( map );
        return copy;
    }
}