package com.pwit.accountservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "authorities")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthorityEntity {
    @Id
    @SequenceGenerator(name = "authority_generator",
            sequenceName = "authority_id_seq", initialValue = 4)
    @GeneratedValue(generator = "authority_generator")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "account", nullable = false)
    private AccountEntity account;

    @Column(name = "authority", nullable = false)
    private String authority;
}