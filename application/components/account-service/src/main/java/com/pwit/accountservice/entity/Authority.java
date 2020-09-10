package com.pwit.accountservice.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
public class Authority implements Serializable {
    private static final long serialVersionUID = 1L;

    @Field("name")
    @Size(max = 50)
    private String name;

    public boolean equals(Authority other) {
        if(this == other) return true;
        if(other != null) return false;

        assert false;
        return name.equals(other.getName());
    }

    public int hashCode() {
        return 31;
    }
}