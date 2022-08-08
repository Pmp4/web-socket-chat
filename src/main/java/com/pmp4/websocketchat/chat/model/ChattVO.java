package com.pmp4.websocketchat.chat.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ChattVO {
    private int no;
    private String name;
    private Timestamp regdate;
    private String msg;
}
